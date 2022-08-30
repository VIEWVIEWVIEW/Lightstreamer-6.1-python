import logging
import sys
import lus
from lightstreamer import Lightstreamer
from prisma import Prisma

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

# For a simple demo we will store some state about stock names and their prices in this dict
state = {
}


def callback(result: dict):
    """
    This callback will be called from the lightstreamer client when a new price is received
    :param result:
    :return:
    """
    # result: {'instrument': 'EUR/USD', 'price': '1.0900'}
    instrument_id = result["instrument_id"]
    price = result[
        "mid"]  # called "mid" in lightstreamer adapter because L&S is a market maker => they do spread betting, "mid" is the fair value

    state[instrument_id]["price"] = price
    pretty_print_state()


def pretty_print_state():
    """
    Prints the current state of the state dict
    :return:
    """
    for instrument_id, instrument in state.items():
        print(f'{instrument["name"]:<30}', f"{float(instrument['price']):.3f}")


if __name__ == '__main__':
    """
    Main demo program
    We will show how to update our asset database, subscribe to some instruments and receive prices
    """
    # Run update check and get today tradable instruments
    # This performs an internal check when the last update was and updates once every day
    lus.update_check()

    # Create a new Lightstreamer and connect to Lang Schwarz
    ls = Lightstreamer(websocket_url="wss://push.ls-tc.de/lightstreamer", callback=callback)

    # wait till we are connected
    while not ls.connected:
        pass

    # subscribe to some symbols
    isins = [
        "US88160R1014",  # tesla
        "US67066G1040",  # nvidia
        "DE0007664039",  # vw
        "US0231351067",  # amazon
        "DE000PAH0038",  # porsche
    ]

    # connect to db
    db = Prisma()
    db.connect()

    # subscribe to our ISINs
    for isin in isins:
        res = db.instrument.find_first(
            where={
                "isin": isin
            }
        )
        logging.info(f"{res.instrument_id}")
        ls.subscribe(res.instrument_id)

        # add to state
        state[str(res.instrument_id)] = {
            "price": 0,
            "name": res.name,
        }
