cordova.define("com.radlib.cordova.rfidreader.Resources", function(require, exports, module) { var resources = {};

/**
  returns current time in HH:MM:SS string format
*/
resources.getCurrentTime = function(){
  var timeNow = new Date();
  var hours   = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
  var timeString = "" + ((hours > 12) ? hours - 12 : hours);
  timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
  timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
  timeString  += (hours >= 12) ? " P.M." : " A.M.";
  return timeString;
}

 /**
    returns date in MM/DD/YYYY format
 */
resources.getCurrentDate = function(){
  var dateNow = new Date();
  var month   = dateNow.getMonth();
  var date    = dateNow.getDate();
  var year    = dateNow.getFullYear();
  var dateString = "" + (month + 1) + "/";
  dateString  += date + "/";
  dateString  += year;
  return dateString;
}

module.exports = resources;
});
