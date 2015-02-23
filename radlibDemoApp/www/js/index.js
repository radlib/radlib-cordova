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

/*
window.onload = {
   var slideMenuButton = document.getElementById('slide-menu-button');
    slideMenuButton.onclick = function (e) {
        var cl = document.body.classList;
        if (cl.contains('left-nav')) {
            cl.remove('left-nav');
        } else {
            cl.add('left-nav');
        }
    };
}*/

$('#cheque').change(
   function() {
      console.log("CHANGED CHECKBOX!");
      toggleBT();
   });

var objTSL1128 = {};
	objTSL1128.connection = "Bluetooth";
	objTSL1128.model = "TSL1128UHF";
	objTSL1128.address = "20:14:05:08:15:63";
	objTSL1128.friendlyName = "UHF Test";

var objRC522 = {};
	objRC522.connection = "Bluetooth";
	objRC522.model = "ArduinoRC522LF";
	objRC522.address = "00:14:03:02:03:26";
	objRC522.friendlyName = "LF Test";

function getStream() {
   var dropdown = document.getElementById("reader_selector");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;

   if (selectedReader == "scan") {
      radlib.directConnect(dumpLog, dumpLog, "", "STREAM"); // CURRENTLY BROKEN
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
      radlib.directConnect(dumpLog, dumpLog, "", "PARSED"); // CURRENTLY BROKEN
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