cordova.define("com.radlib.cordova.bluetoothscanner.BluetoothScanner", function(require, exports, module) { /*global cordova*/
module.exports = {
	
	connect: function(success, failure, address){
		if(address == ""){
			scan(success, failure);
		}else{
			connectTo(success, failure, address);
		}
	},
	
	scan: function(success, failure){
		var id, result;
		var parsedResults = function(data){
			var idIndex = data.indexOf("Card UID: ");
			if(idIndex >= 0){
				idIndex += 10;
				id = data.substring(idIndex, idIndex + 12);
			}
			if(data.indexOf("responded with NAK") >= 0){
				result = "seen";
			}
			else if(data.indexOf("Timeout in communication") >= 0){
				result = "lost";
			}
			var returnVal = id.concat(result);
			success(returnVal);
		};
		cordova.exec(parsedResults, failure, "BluetoothScanner", "scan", []);
	},
	
	connectTo: function(success, failure, address){
		cordova.exec(success ,failure, "BluetoothScanner", "connect", [address]);
	},
	
	stop: function (success, failure) {
		cordova.exec(success, failure, "BluetoothScanner", "stop", []);
	}
};
});
