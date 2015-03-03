
var bluetooth = require('./CommBluetooth');
var resources = require('./Resources');
var ReaderArduino_RC522_LF = {};

/**
 * Provides a parser to parse the RC522 LF Bluetooth device. This calls
 * the success every time a "frame" has been built, the error callback 
 * if it failed to connect to the device, and the reader object sent in from
 * RadLib.js. On each successful callback, an object with the following properties
 * is returned:
 *       id - id of the read tag
 *       reader - device name of this reader
 *       friendlyName - user specified name of this reader
 *       time - time frame was read
 *       date - date frame was read
 *       frame - the frame which was parsed
 * @success function(JSON) function to call on success
 * @failure function(string errorMsg) function to call on failure
 * @reader JSON object sent in from RadLib.js
 */
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
