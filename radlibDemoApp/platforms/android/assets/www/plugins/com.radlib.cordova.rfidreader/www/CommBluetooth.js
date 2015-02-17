cordova.define("com.radlib.cordova.rfidreader.CommBluetooth", function(require, exports, module) { var exec = require('cordova/exec');

var bluetooth = {};

bluetooth.turnOnBT = function(success, failure){
   exec(success, failure, "BluetoothComm", "turnOnBT", []);
};

module.exports = bluetooth;

});
