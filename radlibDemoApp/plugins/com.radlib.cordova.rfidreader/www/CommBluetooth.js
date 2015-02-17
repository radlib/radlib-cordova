var exec = require('cordova/exec');

var bluetooth = {};

bluetooth.turnOnBT = function(success, failure){
   exec(success, failure, "BluetoothComm", "turnOnBT", []);
};

module.exports = bluetooth;
