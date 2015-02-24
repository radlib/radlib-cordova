
var bluetooth = require('./CommBluetooth');
var resources = require('./Resources');
var ReaderArduino_RC522_LF = {};

ReaderArduino_RC522_LF.connectRC522Parsed = function(success, failure, reader) {
   var tagId, result;
   var returnVal = {};
   var buffer = "";

   // parser function, expects frames "starting with HEADER"
   var parsedResults = function(data){
      buffer = buffer.concat(data);
      var nextFrameStart = buffer.lastIndexOf("~~~~~~~~HEADER~~~~~~~~");
      if(nextFrameStart > 0){
         var currentFrame = buffer.substring(0, nextFrameStart);
         var idIndex = currentFrame.indexOf("Card UID: ");
         if(idIndex >= 0){ // skip past header
            idIndex += 10;
            returnVal.id = currentFrame.substring(idIndex, idIndex + 11);
            returnVal.reader = "RC522 LF";
            returnVal.friendlyName = reader.friendlyName;
         }
         if(currentFrame.indexOf("responded with NAK") >= 0){ // msg given when seen
            returnVal.report = "seen";
            returnVal.time = resources.getCurrentTime();
            returnVal.date = resources.getCurrentDate();
            success(returnVal); // return object with "reader", "id", and "firstSeen" fields
         }
         else if(currentFrame.indexOf("Timeout in communication") >= 0){ // msg given when lost
            returnVal.report = "lost";
            returnVal.time = resources.getCurrentTime();
            returnVal.date = resources.getCurrentDate();
         }
         // start building up the next frame
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
   };

   if(reader.address == ""){ // scan for nearby bluetooth devices
      bluetooth.startDiscovery(parsedResults, failure);
   }else{ // connect directly to the provided address
      bluetooth.connectStream(parsedResults, failure, reader.address);
   }
};
   
module.exports = ReaderArduino_RC522_LF;
