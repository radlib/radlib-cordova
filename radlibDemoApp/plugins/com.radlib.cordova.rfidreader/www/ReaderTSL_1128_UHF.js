
var bluetooth = require('./CommBluetooth');
var ReaderTSL_1128_UHF = {};

ReaderTSL_1128_UHF.connectUHFParsed = function(success, failure, address){
   var tagId, result;
   var returnVal = {};
   var buffer = "";

   var parsedResults = function(data){
      buffer = buffer.concat(data);
      if(buffer.lastIndexOf("OK:") >= 0){
         var nextFrameStart = buffer.lastIndexOf("OK:");
      }
      else{
         var nextFrameStart = buffer.lastIndexOf("ER:");
      }

      var currentFrame = buffer.substring(0, nextFrameStart);
      var idIndex;

      while(currentFrame.indexOf("EP: ") >= 0){ // indexOf returns -1 if not found
         idIndex = currentFrame.indexOf("EP: ");
         currentFrame = currentFrame.slice(0, idIndex) + currentFrame.slice(idIndex + 4, currentFrame.length); // remove "EP: " from the string
         returnVal.id = currentFrame.substring(idIndex, idIndex + 24);
         returnVal.report = "seen";
         returnVal.reader = "TSL 1128 UHF";
         returnVal.time = resources.getCurrentTime();
         returnVal.date = resources.getCurrentDate();
         success(returnVal);
      }

      buffer = buffer.substring(nextFrameStart, buffer.length);

      //if(currentFrame.indexOf("OK: ") >= 0){//msg given when seen
         //returnVal.report = "seen";
         //success(returnVal);//return object with "reader", "id", and "firstSeen" fields
         //buffer = buffer.substring(nextFrameStart, buffer.length);
      //}
      //else if(currentFrame.indexOf("ER:005") >= 0){//msg given when lost
         //returnVal.report = "lost";
      //}  

       //start building up the next frame
       //buffer = buffer.substring(nextFrameStart, buffer.length);
   };
   if(address == ""){//scan for nearby bluetooth devices
      bluetooth.startDiscovery(parsedResults, failure);
   }else{//connect directly to the provided address
      bluetooth.connectStream(parsedResults, failure, address);
   }
};

module.exports = ReaderTSL_1128_UHF;
