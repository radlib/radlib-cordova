cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/BluetoothScanner.js",
        "id": "com.radlib.cordova.rfidreader.BluetoothScanner",
        "clobbers": [
            "bluetoothScanner"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/Resources.js",
        "id": "com.radlib.cordova.rfidreader.Resources",
        "clobbers": [
            "resources"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/RadLib.js",
        "id": "com.radlib.cordova.rfidreader.RadLib",
        "clobbers": [
            "radlib"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/CommBluetooth.js",
        "id": "com.radlib.cordova.rfidreader.CommBluetooth"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/BluetoothUtils.js",
        "id": "com.radlib.cordova.rfidreader.BluetoothUtils"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/ReaderArduino_RC522_LF.js",
        "id": "com.radlib.cordova.rfidreader.ReaderArduino_RC522_LF"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/ReaderTSL_1128_UHF.js",
        "id": "com.radlib.cordova.rfidreader.ReaderTSL_1128_UHF"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.msopentech.websql": "0.0.7",
    "com.radlib.cordova.rfidreader": "0.0.0"
}
// BOTTOM OF METADATA
});