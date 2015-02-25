
var bluetooth = require('./CommBluetooth');
var resources = require('./Resources');
var ReaderArduino_RC522_LF = {};

ReaderArduino_RC522_LF.parse = function(success, failure, reader) {
   var buffer = "";
   // parser function, expects frames "starting with HEADER"
   var parsedResults = function(data){
      var nextFrameStart, currentFrame, idIndex, returnVal = {};
      buffer = buffer.concat(data);
      nextFrameStart = buffer.lastIndexOf("~~~~~~~~HEADER~~~~~~~~");
      if(nextFrameStart > 0){
         currentFrame = buffer.substring(0, nextFrameStart);
         idIndex = currentFrame.indexOf("Card UID: ");
         if(idIndex >= 0){ // skip past header
            idIndex += 10;
            returnVal.id = currentFrame.substring(idIndex, idIndex + 11);
            returnVal.reader = "RC522 LF";
            returnVal.friendlyName = reader.friendlyName;
            returnVal.time = resources.getCurrentTime();
            returnVal.date = resources.getCurrentDate();
            returnVal.frame = currentFrame;
         }
         if(currentFrame.indexOf("responded with NAK") >= 0){ // msg given when seen
            returnVal.report = "seen";
            success(returnVal);
         }
         else if(currentFrame.indexOf("Timeout in communication") >= 0){ // msg given when lost
            returnVal.report = "lost";
            success(returnVal);
            
         }
         // start building up the next frame
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
   };
   
   //call bluetooth connect to get input stream
   bluetooth.connectStream(parsedResults, failure, reader.address);
};
   
module.exports = ReaderArduino_RC522_LF;
