import random
import re
import websocket
import requests
import logging
import threading
from decimal import Decimal
logger = logging.getLogger(__name__)

# If param is omitted or None, the current system time is used
random.seed()

class Lightstreamer:
    def __init__(self, websocket_url: str,
                 adapter_set="WALLSTREETONLINE",
                 origin="https://www.ls-tc.de",
                 referer="https://www.ls-tc.de/",
                 create_session_url="https://push.ls-tc.de/lightstreamer/create_session.js",
                 subprotocols=["js.lightstreamer.com"],
                 useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                 callback=None,
                 ):
        self.websocket_url = websocket_url
        self.adapter_set = adapter_set
        self.origin = origin
        self.referer = referer
        self.create_session_url = create_session_url
        self.subprotocols = subprotocols
        self.useragent = useragent

        self.subscriptions = {

        }

        if (callback is not None):
            self.callback = callback

        # Black magic, don't touch.
        # We need a phase which is 4 digits long and ends on three.
        # Apparently this is used for some sort of idempotency / making sure that no request is sent twice,
        # but I don't know how exactly it works
        random.seed()
        phase = random.randint(100, 200)
        self.phase = str(phase) + "3"

        self.session_id = None
        self.ws = None
        self.connected = False

        self.create_session()

    def create_session(self):
        """
        Creates a session on the server.
        :return:
        """
        # create session
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
            'Accept': '*/*',
            'Accept-Language': 'en,en-GB;q=0.5',
            # 'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': self.origin,
            'DNT': '1',
            'Connection': 'keep-alive',
            'Referer': self.referer,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
        }

        data = {
            "LS_op2": "create",
            "LS_phase": self.phase,
            "LS_cause": "new.api",
            "LS_polling": "true",
            "LS_polling_millis": "0",
            "LS_idle_millis": "0",
            "LS_cid": "pcYgxn8m8 feOojyA1S681m3g2.pz478mF4Dy",  # magic value for identifying client
            "LS_adapter_set": self.adapter_set,
            "LS_container": "lsc"
        }

        response = requests.post(self.create_session_url, headers=headers, data=data)

        session_filter = re.compile(r"(?<=start\(')(.*?)(?=')")
        self.session_id = session_filter.search(response.text).group()

        logger.info(f"Session ID: {self.session_id}")

        websocket.enableTrace(False)
        self.ws = websocket.WebSocketApp(self.websocket_url,
                                         subprotocols=self.subprotocols,
                                         header=[
                                             "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0"],
                                         on_open=self.on_open,
                                         on_message=self.on_message,
                                         on_error=self.on_error,
                                         on_close=self.on_close)

        def run():
            self.ws.run_forever(origin=self.origin)

        thread = threading.Thread(target=run).start()

    def on_message(self, ws, message):
        # d(1,1,'278.6','2022-08-30T18:26:03.002',2,'2022-08-30T18:26:03.002',3);
        # d(1,1,1,'2022-08-30T18:25:59.662',1,'278.5','2022-08-30T18:25:59.662',3);
        # if message fits this pattern: d(137,1,'152.28','632','152.16','632');
        # then we have a new quote
        if re.match(r"d\(\d+,", message):

            # lol, this is ugly
            message = message.split("(")
            message.pop(0)
            message = str(message[0])
            message = message.split(");")
            message.pop()
            message = str(message[0])
            message = message.split(",")

            result = {
                "instrument_id": message[0],
                "mid": message[-1].replace("'", ""),
            }

            self.callback(result)

    def on_error(self, ws, error):
        logger.error(f"Websocket error: {error}")

    def on_close(self, ws, close_status_code, close_msg):
        logger.warn(f"Websocket closed with status code {close_status_code} and message {close_msg}")

    def on_open(self, ws: websocket.WebSocket):
        """
        Called when the websocket is opened.
        Binds the websocket to the session.
        :param ws:
        :return:
        """
        logger.info("Websocket opened")
        self.connected = True

        first_message = 'bind_session\r\nLS_session=' + str(self.session_id) + '&LS_phase=' + str(
            3403) + '&LS_cause=loop1&LS_keepalive_millis=5000&LS_container=lsc&'

        self.ws.send(first_message.encode('utf-8'), opcode=websocket.ABNF.OPCODE_TEXT)

        # DEBUG
        # second_message = 'control\r\nLS_mode=MERGE&LS_id=41933%401&LS_schema=ask%20askTime%20askSize%20bid%20bidTime%20bidSize%20trade%20tradeTime%20tradeSize%20currencySymbol%20categoryId&LS_data_adapter=QUOTE&LS_snapshot=false&LS_table=2&LS_req_phase=460&LS_win_phase=66&LS_op=add&LS_session=' + self.session_id + '&'
        # self.ws.send(second_message.encode('utf-8'), opcode=websocket.ABNF.OPCODE_TEXT)

    def _build_subscription_message(self, instrument_id, table_id):
        """
        Builds a subscription message for the given instrument_id and table_id.
        :param instrument_id:
        :param table_id:
        :return:
        """
        message = 'control\r\n' \
                  + 'LS_mode=MERGE&' \
                  + 'LS_id=' + str(instrument_id) + '@1&' \
                  + 'LS_schema=mid&' \
                  + 'LS_data_adapter=QUOTE&' \
                  + 'LS_snapshot=false&' \
                  + 'LS_table=' + str(table_id) +'&' \
                  + 'LS_op=add&' \
                  + 'LS_session=' + self.session_id + '&'
        return message

    def subscribe(self, instrument_id):
        """
        Subscribes to the given instrument.
        :param instrument_id:
        :return:
        """
        table_id = random.randint(1, 200)
        message = self._build_subscription_message(instrument_id, instrument_id)
        # logger.info("Sending message:" + message)
        self.ws.send(message.encode('utf-8'), opcode=websocket.ABNF.OPCODE_TEXT)

