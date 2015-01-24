/*global cordova*/
module.exports = {
	
	/**
		function to connect to a bluetooth device.
		#success callback function on success
		#failure callback function on error
		#address empty string "" to scan for nearby devices,
		         otherwise provide a valid bluetooth MAC address in string format
	*/
	connect: function(success, failure, address){
		var tagId, result;
		var returnVal = {};
		returnVal.reader = "LF Bluetooth";
		//parser function, expects frames "starting with HEADER"
		var parsedResults = function(data){
			var idIndex = data.indexOf("Card UID: ");
			if(idIndex >= 0){//skip past header
				idIndex += 10;
				returnVal.id = data.substring(idIndex, idIndex + 11);
			}
			if(data.indexOf("responded with NAK") >= 0){//msg given when seen
				returnVal.firstSeen = getCurrentTime();
				success(returnVal);//return object with "reader", "id", and "firstSeen" fields
			}
			else if(data.indexOf("Timeout in communication") >= 0){//msg given when lost
				//result = "lost";
			}
			
			
		};
		if(address == ""){//scan for nearby bluetooth devices
			cordova.exec(parsedResults, failure, "BluetoothScanner", "startDiscovery", []);
		}else{//connect directly to the provided address
			cordova.exec(parsedResults ,failure, "BluetoothScanner", "connect", [address]);
		}
	},
	
	/**
		returns current time in HH:MM:SS string format
	*/
	getCurrentTime: function(){
		var timeNow = new Date();
		var hours   = timeNow.getHours();
		var minutes = timeNow.getMinutes();
		var seconds = timeNow.getSeconds();
		var timeString = "" + ((hours > 12) ? hours - 12 : hours);
		timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
		timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
		timeString  += (hours >= 12) ? " P.M." : " A.M.";
		return timeString;
	},
	
	/**
		stop bluetooth discovery
	*/
	stopDiscovery: function (success, failure) {
		cordova.exec(success, failure, "BluetoothScanner", "stopDiscovery", []);
	},
	
	/**
		function to turn on bluetooth
	*/
	turnOnBT: function(success, failure){
		cordova.exec(success, failure, "BluetoothScanner", "turnOnBT", []);
	},
	
	/**
		function to turn on bluetooth
	*/
	turnOffBT: function(success, failure){
		cordova.exec(success, failure, "BluetoothScanner", "turnOffBT", []);
	},
	
	testing: function(success, failure){
		cordova.exec(success, failure, "BluetoothScanner", "testing", []);
	}
};


