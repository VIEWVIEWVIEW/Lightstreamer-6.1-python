import ls from "lightstreamer-client";
import { https } from 'http-debug';
// logger from meme
/**
 * 
 var loggerProvider = new ls.SimpleLoggerProvider();
 loggerProvider.addLoggerAppender(new ls.ConsoleAppender("DEBUG", "*"));
 ls.LightstreamerClient.setLoggerProvider(loggerProvider);
 */

var lsClient = new ls.LightstreamerClient(
  "https://push.ls-tc.de/",
  "WALLSTREETONLINE",

);

// console.log(new ls.ConnectionOptions)

lsClient.connect();
var testSubscription = new ls.Subscription(
  "MERGE",
  ["1232685@1"],
  [
    "mid",
    "midTime",
    "midPerf1d",
    "midPerf1dRel",
    "bid",
    "bidSize",
    "ask",
    "askSize",
    "tradeTime",
    "trade",
    "bidTime",
    "categoryId",
    "currencyISO",
    "volume",
    "askTime",
  ]
);
testSubscription.setDataAdapter("QUOTE");
testSubscription.setRequestedSnapshot("yes");
lsClient.subscribe(testSubscription);
lsClient.addListener({
  onStatusChange: function (newStatus) {
    console.log(newStatus);
  },
});

testSubscription.addListener({
  onSubscription: function () {
    console.log("SUBSCRIBED");
  },
  onUnsubscription: function () {
    console.log("UNSUBSCRIBED");
  },
  onItemUpdate: function (obj) {
    const quote = {
      lusId: obj.getItemName(),
      mid: obj.getValue("mid"),
      midTime: obj.getValue("midTime"),
      midPerf1d: obj.getValue("midPerf1d"),
      midPerf1dRel: obj.getValue("midPerf1dRel"),
      bid: obj.getValue("bid"),
      bidSize: obj.getValue("bidSize"),
      ask: obj.getValue("ask"),
      askSize: obj.getValue("askSize"),
      tradeTime: obj.getValue("tradeTime"),
      trade: obj.getValue("trade"),
      bidTime: obj.getValue("bidTime"),
      askTime: obj.getValue("askTime"),
      categoryId: obj.getValue("categoryId"),
      currencyISO: obj.getValue("currencyISO"),
      volume: obj.getValue("volume"),
    };
    console.log(quote)
    console.log(
      obj.getValue("ask"),
      obj.getItemName(),
      obj.getValue("askSize"),
      obj.getValue("askTime"),
      obj.getValue("bidTime"),
      new Date()
    );
    //onsole.log(obj.getValue("bid") + ": " + obj.getValue("last_price"));
  },
});
