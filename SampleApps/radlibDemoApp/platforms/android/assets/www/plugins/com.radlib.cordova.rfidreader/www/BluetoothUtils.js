cordova.define("com.radlib.cordova.rfidreader.BluetoothUtils", function(require, exports, module) { var bluetooth = require("./CommBluetooth");

var bluetoothUtils = {};

bluetoothUtils.turnOnBluetooth = function(success, failure) {
   bluetooth.turnOnBT(success, failure);
};

bluetoothUtils.turnOffBluetooth = function(success, failure) {
   bluetooth.turnOffBT(success, failure);
};

bluetoothUtils.startDiscovery = function(success, failure) {
   bluetooth.startDiscovery(success, failure);
};

bluetoothUtils.stopDiscovery = function(success, failure) {
   bluetooth.stopDiscovery(success, failure);
};

module.exports = bluetoothUtils;

});
