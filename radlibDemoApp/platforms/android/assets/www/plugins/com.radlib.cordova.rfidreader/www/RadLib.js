cordova.define("com.radlib.cordova.rfidreader.RadLib", function(require, exports, module) { //These comments are extremely obviously who writes in javascript/nodejs, so
//generally they should not even be in the file like this
//but these are provided here since some of you have never touched js/nodejs
//Should probably delete these sort of comments in the end.

//require the necessary external files
var bluetooth = require("./CommBluetooth");

//create empty object to be exported
var radlib = {};

//provide a function as property of radlib object
radlib.test = function(success, failure){
   bluetooth.turnOnBT(success, failure);
};

//export object with all its functions
module.exports = radlib;
});
