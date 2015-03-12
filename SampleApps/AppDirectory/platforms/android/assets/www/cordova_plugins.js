cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/Resources.js",
        "id": "com.radlib.cordova.rfidreader.Resources"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/RadLib.js",
        "id": "com.radlib.cordova.rfidreader.RadLib",
        "clobbers": [
            "radlib"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/InternalBarcodeScanner.js",
        "id": "com.radlib.cordova.rfidreader.InternalBarcodeScanner"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/CommBluetooth.js",
        "id": "com.radlib.cordova.rfidreader.CommBluetooth"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/BluetoothUtils.js",
        "id": "com.radlib.cordova.rfidreader.BluetoothUtils",
        "clobbers": [
            "bluetoothUtils"
        ]
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/ReaderArduino_RC522_HF.js",
        "id": "com.radlib.cordova.rfidreader.ReaderArduino_RC522_HF"
    },
    {
        "file": "plugins/com.radlib.cordova.rfidreader/www/ReaderTSL_1128_UHF.js",
        "id": "com.radlib.cordova.rfidreader.ReaderTSL_1128_UHF"
    },
    {
        "file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
        "id": "com.phonegap.plugins.barcodescanner.BarcodeScanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.radlib.cordova.rfidreader": "0.0.0",
    "com.phonegap.plugins.barcodescanner": "2.0.1"
}
// BOTTOM OF METADATA
});