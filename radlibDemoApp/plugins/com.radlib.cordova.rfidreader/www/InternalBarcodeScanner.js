
var resources = require('./Resources');
var internalbarcodescanner = {};

internalbarcodescanner.scanBarcode = function(success, failure) {
   console.log('scanning');

   var scanner = cordova.require("cordova/plugin/BarcodeScanner");

   var barcodeSuccess = function(result) {
      alert("We got a barcode\n" + 
       "Result: " + result.text + "\n" + 
       "Format: " + result.format + "\n" + 
       "Cancelled: " + result.cancelled);  

      console.log("Scanner result: \n" +
       "text: " + result.text + "\n" +
       "format: " + result.format + "\n" +
       "cancelled: " + result.cancelled + "\n");

      var barcodeObj = {};
      barcodeObj.id = result.text;
      barcodeObj.reader = "Internal Barcode Scanner";
      barcodeObj.friendlyName = result.format;
      barcodeObj.time = resources.getCurrentTime();
      barcodeObj.date = resources.getCurrentDate();
      barcodeObj.report = "seen";

      success(barcodeObj);

      document.getElementById("info").innerHTML = result.text;
      console.log(result);
   }

   var barcodeFailure = function(error) { 
      console.log("Scanning failed: ", error); 
   }

   scanner.scan(barcodeSuccess, barcodeFailure);
};
   
module.exports = internalbarcodescanner;
