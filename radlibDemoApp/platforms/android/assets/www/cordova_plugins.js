cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.radlib.cordova.bluetoothscanner/www/BluetoothScanner.js",
        "id": "com.radlib.cordova.bluetoothscanner.BluetoothScanner",
        "clobbers": [
            "bluetoothScanner"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.radlib.cordova.bluetoothscanner": "0.0.0",
    "com.megster.cordova.bluetoothserial": "0.3.3"
}
// BOTTOM OF METADATA
});