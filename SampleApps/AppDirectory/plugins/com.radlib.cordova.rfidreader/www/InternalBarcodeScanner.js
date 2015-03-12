
var resources = require('./Resources');
var internalbarcodescanner = {};

/**
* Provides the calls to the internal camera to provide barcode scanner
* functionality. Uses the com.phonegap.plugins.barcodescanner plugin.
*
* @success function(struct result) function to call on success
* @failure function(string errorMsg) function to call on failure
*/
internalbarcodescanner.scanBarcode = function(success, failure) {
   var scanner = cordova.require("cordova/plugin/BarcodeScanner");

   var barcodeSuccess = function(result) {
      if (!result.cancelled) {
        alert("Scanner Result: \n" + 
       "Result: " + result.text + "\n" + 
       "Format: " + result.format + "\n");

        var barcodeObj = {};
        barcodeObj.id = result.text;
        barcodeObj.reader = "Internal Barcode Scanner";
        barcodeObj.friendlyName = result.format;
        barcodeObj.time = resources.getCurrentTime();
        barcodeObj.date = resources.getCurrentDate();
        barcodeObj.report = "seen";

        success(barcodeObj);
      }
   }

   var barcodeFailure = function(error) { 
      alert("Scanning failed: ", error); 
   }

   scanner.scan(barcodeSuccess, barcodeFailure);
};
   
module.exports = internalbarcodescanner;
