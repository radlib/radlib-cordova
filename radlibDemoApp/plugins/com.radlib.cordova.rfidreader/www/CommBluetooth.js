var exec = require('cordova/exec');

var bluetooth = {};

bluetooth.turnOnBT = function(success, failure) {
   exec(success, failure, "BluetoothComm", "turnOnBT", []);
};

bluetooth.turnOffBT = function (success, failure) {
   exec(success, failure, "BluetoothComm", "turnOffBT", []);
};

bluetooth.stopDiscovery = function (success, failure) {
   exec(success, failure, "BluetoothComm", "stopDiscovery", []);
};

module.exports = bluetooth;
