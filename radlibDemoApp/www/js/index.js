function initialize_all() {
   var slideMenuButton = document.getElementById('slide-menu-button');
    slideMenuButton.onclick = function (e) {
        var cl = document.body.classList;
        if (cl.contains('left-nav')) {
            cl.remove('left-nav');
        } else {
            cl.add('left-nav');
        }
    };
    db_initAndLoad();
}

$('#cheque').change(
   function() {
      console.log("CHANGED CHECKBOX!");
      toggleBT();
   });

// Ugly temporary global variables since scan isn't implemented
var objTSL1128 = {};
  objTSL1128.connection = "BLUETOOTH";
  objTSL1128.model = "TSL1128UHF";
  objTSL1128.address = "20:14:05:08:15:63";
  objTSL1128.friendlyName = "Friendly UHF Reader Name";

var objRC522 = {};
  objRC522.connection = "BLUETOOTH";
  objRC522.model = "ARDUINORC522LF";
  objRC522.address = "00:14:03:02:03:26";
  objRC522.friendlyName = "Friendly LF Reader Name";

var objBarcode = {};
  objBarcode.connection = "CAMERA";
  objBarcode.model = "INTERNALCAMERA";
  objBarcode.address = "";
  objBarcode.friendlyName = "Internal Camera";

function getStream() {
   var dropdown = document.getElementById("reader_selector");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;

   if (selectedReader == "scan") {
      bluetoothUtils.stopDiscovery(dumpLog, dumpLog);
   }
   else if (selectedReader == "tsl_1128") {
      radlib.directConnect(dumpLog, dumpLog, objTSL1128, "STREAM");
   }
   else if (selectedReader == "rc522_lf") {
      radlib.directConnect(dumpLog, dumpLog, objRC522, "STREAM");
   }
   else {
      alert("Please select a reader");
   }
}

function getParsed() {
   var dropdown = document.getElementById("reader_selector");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;

   if (selectedReader == "scan") {
      radlib.scanReaders(deleteMe, dumpLog, ["BLUETOOTH"]);
   }
   else if (selectedReader == "tsl_1128") {
      radlib.directConnect(updateTable, dumpLog, objTSL1128, "PARSED");
   }
   else if (selectedReader == "rc522_lf") {
      radlib.directConnect(updateTable, dumpLog, objRC522, "PARSED");
   }
   else {
      alert("Please select a reader");
   }
}

//sample function to show how java returns the device names/addresses
function deleteMe(data){
   var string = "";
   for(var i = 0; i < data.length;i++){
      string += data[i].name + " " + data[i].address + "\n";
   }
   alert(string);
}

// testing
function testing(){
   var object = {};
   object.id = "12 34 56 78";
   object.firstSeen = resources.getCurrentTime();
   object.reader = "DEBUG";
   object.count = 1;

   db_init();
   db_updateCount(object);
   db_print();
}

function scanBarcode() {
   radlib.directConnect(updateTable, dumpLog, objBarcode, "PARSED");
}

//successful/unsuccessful callback function. currently used as a success/error dump
function dumpLog(data){
   document.getElementById("status").innerHTML = data;
}

//toggles turning on bluetooth on/off
function toggleBT(){
   if (document.getElementById('cheque').checked) {
      bluetoothUtils.turnOnBluetooth(dumpLog, dumpLog);
   } else {
      bluetoothUtils.turnOffBluetooth(dumpLog, dumpLog);
   }
}