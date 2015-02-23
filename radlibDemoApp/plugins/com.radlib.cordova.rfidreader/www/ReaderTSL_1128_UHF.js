
var bluetooth = require('./CommBluetooth');
var ReaderTSL_1128_UHF = {};

ReaderTSL_1128_UHF.connectTSL1128Parsed = function(success, failure, reader){
   var tagId, result;
   var returnVal = {};
   var buffer = "";

   var parsedResults = function(data){
      var idIndex;

      buffer = buffer.concat(data);

      if (buffer.lastIndexOf("ER:") >= 0){
         var nextFrameStart = buffer.lastIndexOf("ER:"); // couldn't add 3 on this line for some reason
         var currentFrame = buffer.substring(0, nextFrameStart + 3);
      }
      else {
         var nextFrameStart = buffer.lastIndexOf("OK:");
         var currentFrame = buffer.substring(0, nextFrameStart);
      }

      // Errors and tag reads must happen twice for the parser to react
      if(currentFrame.indexOf("ER:001") >= 0){
         document.getElementById("status").innerHTML = "ER:001 Command not recognized!";
         returnVal.report = "lost";
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
      else if(currentFrame.indexOf("ER:005") >= 0){
         document.getElementById("status").innerHTML = "ER:005 No Transponder Found!";
         returnVal.report = "lost";
         buffer = buffer.substring(nextFrameStart, buffer.length);
      }
      else if(currentFrame.indexOf("ER:008") >= 0){
         document.getElementById("status").innerHTML = "ER:008 Antenna Not Fitted!";
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

      buffer = buffer.substring(nextFrameStart, buffer.length);
   };

   if (reader.address == ""){ //scan for nearby bluetooth devices
      bluetooth.startDiscovery(parsedResults, failure);
   } else { //connect directly to the provided address
      bluetooth.connectStream(parsedResults, failure, reader.address);
   }
};

module.exports = ReaderTSL_1128_UHF;
