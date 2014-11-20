/*global cordova*/
module.exports = {

    scan: function (success, failure) {
        cordova.exec(success, failure, "BluetoothScanner", "scan", []);
    }
};