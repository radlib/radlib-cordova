cordova.define("com.radlib.cordova.rfidreader.BluetoothUtils", function(require, exports, module) { var bluetooth = require("./CommBluetooth");

var bluetoothUtils = {};

/**
 * Turns on the bluetooth device located on the phone.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetoothUtils.turnOnBluetooth = function(success, failure) {
   bluetooth.turnOnBT(success, failure);
};

/**
 * Turns off the bluetooth device located on the phone.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetoothUtils.turnOffBluetooth = function(success, failure) {
   bluetooth.turnOffBT(success, failure);
};

/**
 * Tells bluetooth device to stop scanning for nearby bluetooth devices.
 * @success function(string successMsg) function to call on success
 * @failure function(string errorMsg) function to call on failure
 */
bluetoothUtils.stopDiscovery = function(success, failure) {
   bluetooth.stopDiscovery(success, failure);
};

module.exports = bluetoothUtils;

});
