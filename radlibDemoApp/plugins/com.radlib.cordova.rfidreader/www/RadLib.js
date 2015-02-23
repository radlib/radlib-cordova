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

//provide a function as property of radlib object
//REMOVE THE FOLLOWING 3 FUNCTIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*radlib.test = function(success, failure){
   bluetooth.turnOnBT(success, failure);
};

radlib.turnOnBluetooth = function(success, failure) {
   bluetooth.turnOnBT(success, failure);
};

radlib.turnOffBluetooth = function(success, failure) {
   bluetooth.turnOffBT(success, failure);
};*/

/* COMBINE THE FOLLOWING FUNCTIONS */
radlib.connectStream = function(success, failure, address){
	if(address == ""){//scan for nearby bluetooth devices
		cordova.exec(success, failure, "BluetoothComm", "startDiscovery", []);
	}else{//connect directly to the provided address
		cordova.exec(success, failure, "BluetoothComm", "connect", [address]);
	}
};

radlib.connectRC522Parsed = function(success, failure, address){
  //document.getElementById("status").innerHTML = "I'm Inside Radlib!";
  rc522.connectRC522Parsed(success, failure, address);
};

radlib.connectTSL1128Parsed = function(success, failure, address){
   //document.getElementById("status").innerHTML = "I'm Inside Radlib!";
   tsl1128.connectUHFParsed(success, failure, address);
};

radlib.stopDiscovery = function (success, failure) {
	bluetoothUtils.stopDiscovery(success, failure, "BluetoothComm", "stopDiscovery", []);
};
/* COMBINE THE ABOVE FUNCTIONS */


/* COMBINED FUNCTIONS FROM ABOVE WILL GO IN NEXT 2 FUNCTIONS */

radlib.directconnect = function(success, failure, reader) {
   console.log("direct connected");
};

radlib.scanreaders = function (success, failure, connectionTypes) {
   console.log("scanned for readers");
};


//export object with all its functions
module.exports = radlib;