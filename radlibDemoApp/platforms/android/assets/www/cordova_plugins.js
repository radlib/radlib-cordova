cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.bluetoothscanner/www/BluetoothScanner.js",
        "id": "com.radlib.cordova.bluetoothscanner.BluetoothScanner",
        "clobbers": [
            "bluetoothScanner"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.bluetoothscanner/www/Resources.js",
        "id": "com.radlib.cordova.bluetoothscanner.Resources",
        "clobbers": [
            "resources"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.megster.cordova.bluetoothserial": "0.3.3",
    "com.radlib.cordova.bluetoothscanner": "0.0.0",
    "com.msopentech.websql": "0.0.7"
}
// BOTTOM OF METADATA
});