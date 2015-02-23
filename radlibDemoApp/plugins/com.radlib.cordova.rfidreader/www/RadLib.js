//These comments are extremely obviously who writes in javascript/nodejs, so
//generally they should not even be in the file like this
//but these are provided here since some of you have never touched js/nodejs
//Should probably delete these sort of comments in the end.

//require the necessary external files
var bluetooth = require("./CommBluetooth");
var bluetoothUtils = require("./BluetoothUtils")
var rc522 = require("./ReaderArduino_RC522_LF");
var tsl1128 = require("./ReaderTSL_1128_UHF");

//create empty object to be exported
var radlib = {};

/* COMBINE THE FOLLOWING FUNCTIONS INTO radlib.connect() */
radlib.streamIO = function(success, failure, address){
   bluetooth.connectStream(success, failure, address);
};

radlib.connectRC522Parsed = function(success, failure, address){
  rc522.connectRC522Parsed(success, failure, address);
};

radlib.connectTSL1128Parsed = function(success, failure, address){
   tsl1128.connectUHFParsed(success, failure, address);
};

radlib.directconnect = function(success, failure, reader) {
   console.log("direct connected");
};

/* COMBINE THE ABOVE FUNCTIONS INTO radlib.connect()*/

/* COMBINE FUNCTIONS BELOW INTO radlib.scan() */
radlib.scanreaders = function (success, failure, connectionTypes) {
   console.log("scanned for readers");
};
/* COMBINE FUNCTIONS ABOVE INTO radlib.scan() */

/* Are we moving stopDiscovery? */
radlib.stopDiscovery = function (success, failure) {
   bluetoothUtils.stopDiscovery(success, failure, "BluetoothComm", "stopDiscovery", []);
};

//export object with all its functions
module.exports = radlib;