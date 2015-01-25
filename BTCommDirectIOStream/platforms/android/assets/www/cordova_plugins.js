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
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.megster.cordova.bluetoothserial": "0.3.3",
    "com.radlib.cordova.bluetoothscanner": "0.0.0",
    "org.apache.cordova.device": "0.2.13"
}
// BOTTOM OF METADATA
});