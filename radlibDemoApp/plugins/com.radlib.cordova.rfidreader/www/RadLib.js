//These comments are extremely obviously who writes in javascript/nodejs, so
//generally they should not even be in the file like this
//but these are provided here since some of you have never touched js/nodejs
//Should probably delete these sort of comments in the end.

//require the necessary external files
var bluetooth = require("./CommBluetooth");
var bluetoothUtils = require("./BluetoothUtils")
var rc522 = require("./ReaderArduino_RC522_LF");
var tsl1128 = require("./ReaderTSL_1128_UHF");
var internalCam = require("./InternalBarcodeScanner");

//create empty object to be exported
var radlib = {};

radlib.directConnect = function(success, failure, reader, mode) {
   switch(reader.connection) {
      case "BLUETOOTH":
         dumpLog("You've requested to use Bluetooth!");

         if (mode === "PARSED") {
            if (reader.model === "ARDUINORC522LF"){
               rc522.connectRC522Parsed(success, failure, reader);
            } 
            else if (reader.model === "TSL1128UHF"){
               tsl1128.connectTSL1128Parsed(success, failure, reader);
            }
         }
         else if (mode === "STREAM") {
            bluetooth.connectStream(success, failure, reader.address);
         }

         break;
      case "CAMERA":
         dumpLog("You've requested to use the Camera!");
         internalCam.scanBarcode(success, failure);

         break;
      default:
         dumpLog("ERROR: Not valid connection type!");
         break;
   }
};

/* COMBINE FUNCTIONS BELOW INTO radlib.scan() */
radlib.scanReaders = function (success, failure, connectionTypes) {
   if(connectionTypes.indexOf("BLUETOOTH") >= 0){
      bluetooth.startDiscovery(success, failure);
   };

};
/* COMBINE FUNCTIONS ABOVE INTO radlib.scan() */

//export object with all its functions
module.exports = radlib;