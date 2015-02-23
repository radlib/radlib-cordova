var exec = require('cordova/exec');

var bluetooth = {};

bluetooth.turnOnBT = function(success, failure) {
   exec(success, failure, "BluetoothComm", "turnOnBT", []);
};

bluetooth.turnOffBT = function (success, failure) {
   exec(success, failure, "BluetoothComm", "turnOffBT", []);
};

bluetooth.startDiscovery = function (success, failure) {
   exec(success, failure, "BluetoothComm", "startDiscovery", []);
};

bluetooth.stopDiscovery = function (success, failure) {
   exec(success, failure, "BluetoothComm", "stopDiscovery", []);
};

bluetooth.connectStream = function (success, failure, address) {
	if(address == ""){//scan for nearby bluetooth devices
		exec(success, failure, "BluetoothComm", "startDiscovery", []);
	}else{//connect directly to the provided address
		exec(success, failure, "BluetoothComm", "connect", [address]);
	}
};

module.exports = bluetooth;
