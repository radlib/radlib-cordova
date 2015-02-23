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

radlib.directConnect = function(success, failure, object, mode) {
   if (object.connection === "Bluetooth"){
      if (mode === "PARSED") {
         if (object.model === "ArduinoRC522LF"){
            rc522.connectRC522Parsed(success, failure, object.address);
         } 
         else if (object.model === "TSL1128UHF"){
            tsl1128.connectUHFParsed(success, failure, object.address);
         }
      }
      else if (mode === "STREAM") {
         bluetooth.connectStream(success, failure, object.address);
      }
   }
   else if (object.connection === "Wifi") {
      // simply here as an example for future expansion
   }
   else {
      dumpLog("ERROR: Not valid connection type!");
   }
};

/* COMBINE FUNCTIONS BELOW INTO radlib.scan() */
radlib.scanReaders = function (success, failure, connectionTypes) {
   //console.log("scanned for readers");
};
/* COMBINE FUNCTIONS ABOVE INTO radlib.scan() */

/* Are we moving stopDiscovery? */
radlib.stopDiscovery = function (success, failure) {
   bluetoothUtils.stopDiscovery(success, failure, "BluetoothComm", "stopDiscovery", []);
};

//export object with all its functions
module.exports = radlib;