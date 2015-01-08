/*global cordova*/
module.exports = {

    scan: function (success, failure) {
        cordova.exec(success, failure, "BluetoothScanner", "scan", []);
    },
	
	/*startRead: function (success, failure) {
		setInterval(read(success, failure), 1000);
	},
	
	read: function(success, failure){
		cordova.exec(success, failure, "BluetoothScanner", "read", []);
	},*/
	
	stop: function (success, failure) {
		cordova.exec(success, failure, "BluetoothScanner", "stop", []);
	}
};