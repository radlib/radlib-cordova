cordova.define("com.radlib.cordova.rfidreader.CommBluetooth", function(require, exports, module) { var exec = require('cordova/exec');

var bluetooth = {};

/**
 * Calls native code to turn on the bluetooth device located on the phone.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetooth.turnOnBT = function(success, failure) {
   exec(success, failure, "BluetoothComm", "turnOnBT", []);
};

/**
 * Calls native code to turn off the bluetooth device located on the phone.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetooth.turnOffBT = function (success, failure) {
   exec(success, failure, "BluetoothComm", "turnOffBT", []);
};

/**
 * Tells bluetooth device located on the phone to start scanning for nearby
 * bluetooth devices. On success, returns an array of JSON. Each JSON has the following
 * properties:
 *       name name of the found bluetooth device
 *       address mac address of the found bluetooth device
 * @success function(array[JSON]) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetooth.startDiscovery = function (success, failure) {
   exec(success, failure, "BluetoothComm", "startDiscovery", []);
};

/**
 * Calls native code to stop scanning for nearby bluetooth devices.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetooth.stopDiscovery = function (success, failure) {
   exec(success, failure, "BluetoothComm", "stopDiscovery", []);
};

/**
 * Calls native code to connect to the bluetooth device with the specified
 * MAC address. On success, the successful callback function is called each
 * time the bluetooth devices receives bytes of information.
 * @success function(string stream) function to call on success
 * @failure function(string errorMsg) function to call on failure
 * @address string mac address of the bluetooth device to connect to
 */
bluetooth.connectStream = function (success, failure, address) {
   exec(success, failure, "BluetoothComm", "connect", [address]);
};

module.exports = bluetooth;

});
