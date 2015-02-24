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
   object.firstSeen = "";
   object.module = "DEBUG";
   object.count = 1;

   db_init();
   db_updateCount(object);
   db_print();
}

function testing2(){
   var object = {};
   object.id = "87 65 43 21";
   object.firstSeen = "";
   object.module = "DEBUG";
   object.count = 1;

   db_init();
   db_updateCount(object);
   db_print();
}

function startdel() {
	//$('td:nth-child(5), th:nth-child(5)').show();
	$('.del').show();
}

function finishdel() {
	$('.del').hide();
}

function deletehtmlrow() {
	var rowparent = $(this).parent().parent();
	par.remove();
}

//direct connect to OUR low freq bluetooth reader for IO Stream
function directConnectLFStream(){
   radlib.streamIO(dumpLog, dumpLog, "00:14:03:02:03:26");
}

//direct connect to OUR low freq bluetooth reader for IO Stream
function directConnectUHFStream(){
   radlib.streamIO(dumpLog, dumpLog, "20:14:05:08:15:63");
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