var bluetooth = require("./CommBluetooth");

var bluetoothUtils = {};

bluetoothUtils.turnOnBluetooth = function(success, failure) {
   bluetooth.turnOnBT(success, failure);
};

bluetoothUtils.turnOffBluetooth = function(success, failure) {
   bluetooth.turnOffBT(success, failure);
};

module.exports = bluetoothUtils;
