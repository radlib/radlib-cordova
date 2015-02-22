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

radlib.connectParsed = function(success, failure, address){
  rc522.connectRC522Parsed(success, failure, address);
};

radlib.connectUHFParsed = function(success, failure, address){
	var tagId, result;
	var returnVal = {};
	var buffer = "";

	var parsedResults = function(data){
		buffer = buffer.concat(data);
		if(buffer.lastIndexOf("OK:") >= 0){
			var nextFrameStart = buffer.lastIndexOf("OK:");
		}
		else{
			var nextFrameStart = buffer.lastIndexOf("ER:");
		}

		var currentFrame = buffer.substring(0, nextFrameStart);
		var idIndex;

		while(currentFrame.indexOf("EP: ") >= 0){ // indexOf returns -1 if not found
			idIndex = currentFrame.indexOf("EP: ");
			currentFrame = currentFrame.slice(0, idIndex) + currentFrame.slice(idIndex + 4, currentFrame.length); // remove "EP: " from the string
			returnVal.id = currentFrame.substring(idIndex, idIndex + 24);
			returnVal.report = "seen";
			returnVal.reader = "TSL 1128 UHF";
			success(returnVal);
		}

		buffer = buffer.substring(nextFrameStart, buffer.length);

		//if(currentFrame.indexOf("OK: ") >= 0){//msg given when seen
			//returnVal.report = "seen";
			//success(returnVal);//return object with "reader", "id", and "firstSeen" fields
			//buffer = buffer.substring(nextFrameStart, buffer.length);
		//}
		//else if(currentFrame.indexOf("ER:005") >= 0){//msg given when lost
			//returnVal.report = "lost";
		//}  

	    //start building up the next frame
	    //buffer = buffer.substring(nextFrameStart, buffer.length);
	};
	if(address == ""){//scan for nearby bluetooth devices
		cordova.exec(parsedResults, failure, "BluetoothComm", "startDiscovery", []);
	}else{//connect directly to the provided address
		cordova.exec(parsedResults ,failure, "BluetoothComm", "connect", [address]);
	}
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
