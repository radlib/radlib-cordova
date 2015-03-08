function initialize_all() {
   db_initAndLoad();
   db_checkReaderEntries(objTSL1128);
   db_checkReaderEntries(objRC522);
   db_printReaders();
}

function toggleMenu() {
   var cl = document.body.classList;
      if (cl.contains('left-nav')) {
         cl.remove('left-nav');
      } else {
       cl.add('left-nav');
      }
}

function hideModal() {
   $('#modal').hide();
}

function showAbout() {
   toggleMenu();
   alert("Radlib Demo Application\n© 2015 Team RadLib");
}

$('#cheque').change(
   function() {
      console.log("CHANGED CHECKBOX!");
      toggleBT();
   }
);

// Ugly temporary global variables since scan isn't implemented
var objTSL1128 = {};
  objTSL1128.connection = "BLUETOOTH";
  objTSL1128.model = "TSL_1128_UHF";
  objTSL1128.address = "20:14:05:08:15:63";
  objTSL1128.friendlyName = "TSL 1128";

var objRC522 = {};
  objRC522.connection = "BLUETOOTH";
  objRC522.model = "ARDUINO_RC522_HF";
  objRC522.address = "00:14:03:02:03:26";
  objRC522.friendlyName = "RC522 LF";

function getParsed() {
   var dropdown = document.getElementById("readersDB");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;
   if (selectedReader == "scan") {
      selectConnectionScreen();
   }
   else if (selectedReader == "TSL_1128_UHF" || selectedReader == "Throne") {
      radlib.connect(updateTable, dumpLog, objTSL1128);
   }
   else if (selectedReader == "ARDUINO_RC522_HF") {
      radlib.connect(updateTable, dumpLog, objRC522);
   }
   else {
      alert("Please select a reader");
   }
}

function selectConnectionScreen() {
   $('.controls').hide();
   $('.selectConnectionscan').show();
   $('#tagsDB').hide();
   dumpLog("Please choose a connection type.");
}

function selectConnectionType() {
   $('#button_selectconnection').disabled = "disabled";
   var connectionDropdown = document.getElementById("connection_type_selector");
   var selectedConnection = connectionDropdown.options[connectionDropdown.selectedIndex].value;

   if (selectedConnection == "BLUETOOTH") {
      dumpLog("Scanning for readers, please wait...");

      radlib.scan(deleteMe, dumpLog, ["BLUETOOTH"]);
   }
   else {
      dumpLog("Please select a valid connection type");
   }
}

//sample function to show how java returns the device names/addresses
// DO NOT DELETE!!! MUST RENAME LATER!!!!!!!
function deleteMe(data) {
   dumpLog("Select a reader to connect<br>and save it to the database.");
   $('.controls').hide();
   $('.selectConnectionscan').hide();
   $('.addReader').show();
   $('#tagsDB').hide();

   // RETURNS AN ARRAY OF READERS
   var string = "";
   for(var i = 0; i < data.length;i++) {
      //string += data[i].name + " " + data[i].address + "\n";
      document.getElementById("detected_reader_selector").innerHTML += "<option value='" + data[i].address +"'>" + data[i].name + " - " + data[i].address + "</option>";
   }
   //alert(string);
}

function saveReader() {
   // stop discovery, MOVE THIS LATER
   bluetoothUtils.stopDiscovery(dumpLog, dumpLog);

   dumpLog("Adding reader to database...");

   var connectionDropdown = document.getElementById("detected_reader_selector");
   var readerModel = connectionDropdown.options[connectionDropdown.selectedIndex].innerHTML.split(" - ")[0];
   var readerAddress = connectionDropdown.options[connectionDropdown.selectedIndex].value;
   var friendlyName = document.getElementById("friendlyName").value;

   if(friendlyName == "") {
      friendlyName = "My New Reader";
   }

   var newReader = {};
   newReader.connection = "BLUETOOTH";
   newReader.model = readerModel;
   newReader.address = readerAddress;
   newReader.friendlyName = friendlyName;

   db_checkReaderEntries(newReader);
   dumpLog("Reader saved!");

   $('.controls').show();
   $('.addReader').hide();
   $('#tagsDB').show();
}

// testing Reader DB functionality
function testing(){
   var object = {};
   object.connection = "TestConnection";
   object.model = "TestModel";
   object.address = "12345 5 6";
   object.friendlyName = "DEBUG";

   db_initReaders();
   db_checkReaderEntries(object);
}

// testing
function testpop(){
   var object = {};
   object.id = "12 34 56 78";
   object.firstSeen = "";
   object.friendlyName = "DEBUG";
   object.count = 1;
   db_init();
   db_updateCount(object);
   db_print();
}
function testpop2(){
   var object = {};
   object.id = "87 65 43 21";
   object.firstSeen = "";
   object.friendlyName = "DEBUG";
   object.count = 1;
   db_init();
   db_updateCount(object);
   db_print();
}

function scanBarcode() {
   radlib.connect(updateTable, dumpLog, {connectionType:"CAMERA"});
}

function startdel() {
   toggleMenu();
   $('.del').show();
   $('.testonly').hide();
   $('.controls').hide();
   dumpLog("Select the rows you would like to delete from the table.");
}

function startdelREADER() {
   toggleMenu();
   db_listReaders();
   $('.controls').hide();
   $('.delRead').show();
   $('#tagsTable').hide();
   dumpLog("Select the rows you would like to delete from the table.");
}

// Remove HTML rows for rows with a checked checkbox
function finishdel() {
   $('.del').hide();
   $('.testonly').show();
   $('.controls').show();
   $('#tagsTable').find('tr').each(
      function() {
         var row = $(this);
         if (row.find('input[type="checkbox"]').is(':checked')) {
            var objToDelete = {};
            objToDelete.id = row[0].cells[0].innerHTML;
            objToDelete.friendlyName = row[0].cells[1].innerHTML;
            db_deleteEntry(objToDelete);
            row.remove();
         }
      }
   );
   dumpLog("Select a reader to get started.");
}

function finishdelREADER() {
   $('.delRead').hide();
   $('.testonly').show();
   $('.controls').show();
   $('#tagsTable').show();
   $('#readersTable').find('tr').each(
      function() {
         var row = $(this);
         if (row.find('input[type="checkbox"]').is(':checked')) {
            var objToDelete = {};
            objToDelete.friendlyName = row[0].cells[2].innerHTML;
            db_deleteReaderEntry(objToDelete);
            row.remove();
         }
      }
   );
   db_printReaders();
   dumpLog("Select a reader to get started.");
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
