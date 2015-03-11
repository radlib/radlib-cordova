
var bluetooth = require('./CommBluetooth');
var resources = require('./Resources');
var ReaderTSL_1128_UHF = {};

/**
 * Provides a parser to parse the TSL 1128 Bluetooth reader. This calls
 * success every time an "EP:" tag line is found and the error callback 
 * if it has failed to connect to the device or after two error reads.
 * On each successful callback, an object with the following properties
 * is returned:
 *       id - id of the read tag
 *       reader - device name of this reader
 *       friendlyName - user specified name of this reader
 *       time - time frame was read
 *       date - date frame was read
 *       frame - the frame which was parsed
 * @success function(string stream) function to call on success
 * @failure function(string errorMsg) function to call on failure
 * @address string mac address of the bluetooth device to connect to
 */
ReaderTSL_1128_UHF.parse = function(success, failure, reader){
   var buffer = "";

   var parsedResults = function(data){
      var idIndex, returnVal = {}, nextFrameStart, currentFrame;

      buffer = buffer.concat(data);

      if (buffer.lastIndexOf("ER:") >= 0){
         nextFrameStart = buffer.lastIndexOf("ER:") + 6;
         currentFrame = buffer.substring(0, nextFrameStart);
      }
      else if (buffer.lastIndexOf("OK:") >= 0){
         nextFrameStart = buffer.lastIndexOf("OK:") + 3;
         currentFrame = buffer.substring(0, nextFrameStart);
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }

      if(currentFrame.indexOf("ER:001") >= 0){
         failure("ER:001 Command not recognized!");
         returnVal.report = "lost";
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
      else if(currentFrame.indexOf("ER:005") >= 0){
         failure("ER:005 No Transponder Found!");
         returnVal.report = "lost";
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
      else if(currentFrame.indexOf("ER:008") >= 0){
         failure("ER:008 Antenna Not Fitted!");
         returnVal.report = "lost";
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }

      while (currentFrame.indexOf("EP: ") >= 0){
         document.getElementById("status").innerHTML = "TSL 1128: Tag Read!";
         idIndex = currentFrame.indexOf("EP: ");
         currentFrame = currentFrame.slice(0, idIndex) + currentFrame.slice(idIndex + 4, currentFrame.length); // remove "EP: " from the string
         returnVal.id = currentFrame.substring(idIndex, idIndex + 24);
         returnVal.report = "seen";
         returnVal.reader = "TSL 1128 UHF";
         returnVal.friendlyName = reader.friendlyName;
         returnVal.time = resources.getCurrentTime();
         returnVal.date = resources.getCurrentDate();
         success(returnVal);
      }
   };
   
   // Call bluetooth connect to get input stream
   bluetooth.connectStream(parsedResults, failure, reader.address);
};

module.exports = ReaderTSL_1128_UHF;
