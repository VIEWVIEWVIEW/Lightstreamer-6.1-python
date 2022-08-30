import logging
import re
import requests
import camelot
import datetime
import sys

from bs4 import BeautifulSoup
from os import path
from prisma import Prisma

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

def _get_link_to_handelsuniversum_pdf():
    """
    Returns the link to the handelsuniversum pdf
    The handelsuniversum pdf contains all assets which are tradable on a given date
    :return: https://www.ls-x.de/link/to/todays/handelsuniversum.pdf"
    """
    logging.info("Getting link to handelsuniversum pdf")
    response = requests.get('https://www.ls-x.de/de/handelsuniversum')
    soup = BeautifulSoup(response.content, 'html.parser')
    link_to_handelsuniversum_pdf = soup.select_one(
        "#page_content > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) "
        "> a:nth-child(1)")
    # logging.info(f"Got PDF Link: https://www.ls-x.de{link_to_handelsuniversum_pdf['href']}")

    return f"https://www.ls-x.de{link_to_handelsuniversum_pdf['href']}"


def _download_handelsuniversum_pdf(link_to_pdf):
    """
    Parses the handelsuniversum pdf and returns a list of all assets which are tradable on a given date
    :param link_to_pdf: full link to the pdf
    :return:
    """
    logging.info(f"Downloading handelsuniversum pdf from {link_to_pdf}")
    filename = re.search(r'\w+\.pdf$', link_to_pdf).group()
    file = requests.get(link_to_pdf)

    logging.info(f"Saving handelsuniversum pdf to {path.join('handelsuniversum', filename)}")
    open(path.join('handelsuniversum', filename), 'wb').write(file.content)
    return filename

def _parse_handelsuniversum_pdf(filename, pages='all'):
    """
    :param filename: to pdf file
    :return: tables
    """
    logging.info(f"Parsing {filename}. Pages: {pages}. This will take a few minutes...")
    tables = camelot.read_pdf(path.join('handelsuniversum', filename), pages=pages,
                              flavor='stream',
                              columns=["76.60377358490567,171.44654088050314,322.8301886792453,401.25786163522014,470.5660377358491,621.9496855345913,802.5157232704403,891.8867924528303,1061.5094339622642"])
    # for _ in tables:
        # print(_.df)
    normalized_tables = _normalize_tables(tables)
    return normalized_tables


def _normalize_tables(tables):
    """
    - runs vanity check on rows
    - renames columns
    - removes "null" strings and replaces with None
    :param tables:
    :return:
    """
    for table in tables:
        # rename columns from 1, 2, 3 etc
        table.df.columns = ['wkn', 'isin', 'name', "shortcode", "type", "index_affiliation", "market", "end_date", "minimum_trading_unit", "denomination"]


        # remove all rows where ISIN is not valid
        isin_regex = re.compile(r'[A-Z]{2}\w{10}$')
        table.df = table.df[table.df['isin'].str.contains(isin_regex)]

        # replace , and . with empty string
        table.df['minimum_trading_unit'] = table.df['minimum_trading_unit'].str.replace('[\,\.]', '', regex=True)
        table.df['minimum_trading_unit'] = table.df['minimum_trading_unit'].str.replace('[\,\.]', '', regex=True)
        table.df['minimum_trading_unit'] = table.df['minimum_trading_unit'].replace('null', None)

        # table.df["end_date"] = table.df["end_date"].apply(lambda x: datetime.datetime.strptime(x, '%d.%m.%Y'))

    return tables

def _resolve_isin_to_instrument_id(isin):
    """
    :param isin:
    :return:
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en,en-GB;q=0.5',
        # 'Accept-Encoding': 'gzip, deflate, br',
        'X-Requested-With': 'XMLHttpRequest',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Referer': 'https://www.ls-x.de/de/etf/1428954',
        # Requests sorts cookies= alphabetically
        # 'Cookie': 'disclaimer=2015040809; baukasten=l9cn3j6584u95ti28heokrn803',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
    }

    params = {
        'q': isin,
        'localeId': '2',
    }

    response = requests.get('https://www.ls-x.de/_rpc/json/.lstc/instrument/search/main', params=params,
                            headers=headers)

    instrument_id_and_category_id = (response.json()[0]["instrumentId"], response.json()[0]["categoryid"])
    return instrument_id_and_category_id


def _synchronize_database_with_handelsuniversum():
    """
    Synchronizes the instruments in the database
    :return: Number of instruments added
    """
    # get url, download the file and parse the file
    url = _get_link_to_handelsuniversum_pdf()
    filename = _download_handelsuniversum_pdf(url)
    tables = _parse_handelsuniversum_pdf(filename, pages='all')

    # connect to db
    db = Prisma()
    db.connect()

    # synchronize db
    for index, table in enumerate(tables):
        logging.info(f"{index}/{len(tables)}")
        # create_many is not available for SQLite, therefore we iterate through the data frame and create one by one
        for index, row in table.df.iterrows():
            logging.info("Creating type if not exists: " + row["type"])
            res = db.type.upsert(
                where={
                    "type": row["type"]
                },
                data={
                    "create": {
                        "type": row["type"],
                    },
                    "update": {

                    }
                }
            )

            db.instrument.upsert(
                where={
                    "isin": row["isin"]
                },
                data={
                    "create": {
                        "isin": row["isin"],
                        "wkn": row["wkn"],
                        "name": row["name"],
                        "shortcode": row["shortcode"],
                        "type": row["type"],
                        "index_affiliation": row["index_affiliation"],
                        "market": row["market"],
                    },
                    "update": {
                        "wkn": row["wkn"],
                        "name": row["name"],
                        "shortcode": row["shortcode"],
                        "type": row["type"],
                        "index_affiliation": row["index_affiliation"],
                        "market": row["market"],
                    }
                }
            )
            logging.info("Creating/updating instrument: " + row["name"])

    db.lastupdatehandelsuniversum.upsert(
        where={
            "id": 1
        },
        data={
            "create": {
                "id": 1,
                "filename": filename,
            },
            "update": {
                "filename": filename,
            }
        }
    )

    db.disconnect()


def _get_instrument_ids_for_lightstreamer():
    """
    Adds all missing instrument ids to the database
    :return:
    """
    # connect to db
    db = Prisma()
    db.connect()

    # get all ISINs where instrument_id is null
    instruments = db.instrument.find_many(
        where={ "instrument_id": None },
    )

    # print(instruments)
    # get all instrument ids
    for instrument in instruments:
        logging.info(f"{instrument.isin}")

        instrument_id, market_id = _resolve_isin_to_instrument_id(instrument.isin) # object is not subscripable
        db.instrument.update(
            where={
                "isin": instrument.isin
            },
            data={
                    "instrument_id": instrument_id,
                    "market_id": market_id,
            }
        )

    db.lastupdateinstrumentids.upsert(
        where={
            "id": 1
        },
        data={
            "create": {
                "id": 1,
                "last_update": datetime.datetime.now()
            },
            "update": {
                "last_update": datetime.datetime.now()
            }
        }
    )

    db.disconnect()

def update_check():
    """
    Checks if the database is up to date
    :return:
    """

    link_to_pdf = _get_link_to_handelsuniversum_pdf()
    filename = re.search(r'\w+\.pdf$', link_to_pdf).group()

    # connect to db
    db = Prisma()
    db.connect()


    # check last update instrument ids
    res = db.lastupdateinstrumentids.find_first(
        where={
            "id": 1
        }
    )


    should_update = False
    if res is None:
        logging.info("Instrument IDs: No last update for instrument ids found")
        should_update = True
    else:
        # res can be null
        logging.info(f"Instrument IDs: Last update: {res.last_update.date()} | Today: {datetime.date.today()}")
        if res.last_update.date() < datetime.date.today():
            logging.info("Last update is older than today... Will update")
            should_update = True


    # ---
    # check last update handelsuniversum
    res = db.lastupdatehandelsuniversum.find_first(
        where={
            "id": 1
        }
    )

    if res is None:
        logging.info("Handelsuniversum: No last update for handelsuniversum found")
        should_update = True
    else:
        # res can be null
        logging.info(f"Handelsuniversum: Last filename: {res.filename} | Today: {filename}")
        if res.filename != filename:
            logging.info("Handelsuniversum: Last file is older than today's file... Will update")
            should_update = True

    # ---
    # perform update if necessary
    db.disconnect()
    if should_update:
        update()

def update():
    """
    Updates the database
    :return:
    """
    _synchronize_database_with_handelsuniversum()
    _get_instrument_ids_for_lightstreamer()
