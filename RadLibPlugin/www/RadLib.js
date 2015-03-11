//require the necessary external files
var bluetooth = require("./CommBluetooth");
var rc522 = require("./ReaderArduino_RC522_HF");
var tsl1128 = require("./ReaderTSL_1128_UHF");
var internalCam = require("./InternalBarcodeScanner");

//create empty object to be exported
var radlib = {};

/**
 * Connects to the specified reader. On every read, the success
 * callback function is called. On failure to connect, the failure
 * callback function is called. Accepted reader objects are required
 * to have the following properties:
 *       reader.connectionType : "BLUETOOTH" or "CAMERA"
 *       reader.model : "ARDUINO_RC522_HF" or TSL_1128_UHF for bluetooth connectionTypes
 *       reader.address : mac address in string format
 * @success function(JSON parsedObj) function to call on success
 * @failure function(string errorMsg) function to call on failure
 * @reader JSON object detailing the properties of the RFID reader to connect to
 */
radlib.connect = function(success, failure, reader) {
   switch(reader.connection) {
      case "BLUETOOTH":
         if (reader.model === "ARDUINO_RC522_HF"){
            rc522.parse(success, failure, reader);
         } 
         else if (reader.model === "TSL_1128_UHF"){
            tsl1128.parse(success, failure, reader);
         }else{
            failure("ERROR: Unsupported bluetooth model");
         }
         break;
      case "CAMERA":
         internalCam.scanBarcode(success, failure);

         break;
      default:
         failure("ERROR: Not valid connection type!");
         break;
   }
};

/**
 * Scans for nearby devices based on the connectionTypes specified. Currently,
 * only "BLUETOOTH" is supported as a valid array entry in connectionTypes
 * bluetooth devices. On success, returns an array of JSON. Each JSON has the following
 * properties:
 *       name name of the found bluetooth device
 *       address mac address of the found bluetooth device
 *       connectionType type of connection, only "BLUETOOTH" is supported
 * @success function(array[JSON]) function to call on success
 * @failure function(string) function to call on failure
 */

radlib.scan = function (success, failure, connectionTypes) {
   if(connectionTypes.indexOf("BLUETOOTH") >= 0){
      bluetooth.startDiscovery(success, failure);
   };

};

//export object with all its functions
module.exports = radlib;