/* 
 * index.js
 * These functions are called from index.html.
 */

/*
 * Calls functions from database.js to initialize database with the values from the previous session.
 * Adds the two reader objects to the database if they do not yet exist.
 */
function initialize_all() {
   db_initAndLoad();
   db_printReaders();
}

/* 
 * Callback function for success and failure. Displays a message on the onscreen status bar.
 * PARAMETER
 *    data: string containing the success/failure message
 */
function dumpLog(data){
   document.getElementById("status").innerHTML = data;
}

/*
 * JQuery call to listen for a change in the "cheque" switch.
 * Toggles Bluetooth on/off when the user taps the switch.
 */
$('#cheque').change(
   function() {
      toggleBT();
   }
);

/*
 * Toggles Bluetooth on and off.
 */
function toggleBT(){
   if (document.getElementById('cheque').checked) {
      bluetoothUtils.turnOnBluetooth(dumpLog, dumpLog);
   } else {
      bluetoothUtils.turnOffBluetooth(dumpLog, dumpLog);
   }
}

/*
 * Connects to the built in phone camera for the barcode scanner.
 */
function scanBarcode() {
   radlib.connect(updateTable, dumpLog, {connection:"CAMERA"});
}

/*
 * Connects to the reader selected by the user.
 */
function getParsed() { ////// CHANGE THIS TO SEND OBJECTS TO RADLIB.CONNECT
   var dropdown = document.getElementById("readersDB");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;
   
   if (selectedReader =="prompt") {
      alert("Please select a reader");
   }
   else if (selectedReader == "scan") {
      showSelectConnectionScreen();
   }
   else {
      var parsedObj = JSON.parse(selectedReader);
      radlib.connect(updateTable, dumpLog, parsedObj);
   }
}

/*
 * Shows the screen prompting a user to select a connection type in order to scan for readers.
 */
function showSelectConnectionScreen() {
   $('.controls').hide();
   $('.selectConnectionScreen').show();
   $('#tagsDB').hide();
   dumpLog("Please choose a connection type.");
}

/*
 * Begins scan for readers based on the user's selected connection type.
 */
function selectConnectionType() {
   var selectConnectButton = $('#button_selectconnection');
   var connectionDropdown = document.getElementById("connection_type_selector");
   var selectedConnection = connectionDropdown.options[connectionDropdown.selectedIndex].value;

   if (selectedConnection == "BLUETOOTH") {
      dumpLog("Scanning for readers, please wait...");
      radlib.scan(showDetected, dumpLog, ["BLUETOOTH"]);
   }
   else {
      dumpLog("Please select a valid connection type");
   }
}

/*
 * After scanning for readers, shows a list containing detected readers.
 */
function showDetected(data) {
   dumpLog("Select a reader to connect<br>and save it to the database.");
   $('.controls').hide();
   $('.selectConnectionScreen').hide();
   $('#confirmButtons').hide();
   $('#readerConfirmButtons').hide();
   $('.addReader').show();
   $('#tagsDB').hide();

   for(var i = 0; i < data.length;i++) {
      document.getElementById("detected_reader_selector").innerHTML += "<option value='" + data[i].address +"'>" + data[i].name + " - " + data[i].address + "</option>";
   }
}

/*
 * Saves the selected reader to the reader database and returns reader to the initial home screen.
 */
function saveReaderAndConnect() {
   var detectedReaders = document.getElementById("detected_reader_selector");
   var deviceModel = document.getElementById("device_model_selector");

   var selectedReaderAddress = detectedReaders.options[detectedReaders.selectedIndex].value;
   var selectedModel = deviceModel.options[deviceModel.selectedIndex].value;

   if (selectedReaderAddress == "prompt") {
      alert("Please select a reader to save");
   }
   else if (selectedModel == "prompt") {
      alert("Please select a device model for parsing");
   }
   else {
      var friendlyName = document.getElementById("friendlyName").value;

      if (friendlyName == "") {
         friendlyName = "My New Reader";
      }

      var newReader = {};
      newReader.connection = "BLUETOOTH";
      newReader.model = selectedModel;
      newReader.address = selectedReaderAddress;
      newReader.friendlyName = friendlyName;

      dumpLog("Adding reader to database...");
      db_checkReaderEntries(newReader);
      dumpLog("Reader saved! Connecting...");

      $('.controls').show();
      $('.addReader').hide();
      $('#tagsDB').show();

      radlib.connect(updateTable, dumpLog, newReader);
   }
}

/*
 * Toggles the menu drawer.
 */
function toggleMenu() {
   var cl = document.body.classList;
   if (cl.contains('left-nav')) {
      cl.remove('left-nav');
   } else {
    cl.add('left-nav');
   }
}

/*
 * Shows the screen to delete rows from the tag database.
 */
function startdel() {
   toggleMenu();
   $('.del').show();
   $('.testonly').hide();
   $('.controls').hide();
   dumpLog("Select the rows you would like to delete from the table.");
}

/*
 * Removes HTML rows for row entries with a checked checkbox.
 * Also removes entries for those rows from the tag database.
 * Returns user to initial home screen.
 */
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

/*
 * Shows the screen to delete rows from the reader database.
 */
function startdelREADER() {
   toggleMenu();
   db_listReaders();
   $('.controls').hide();
   $('.delRead').show();
   $('#tagsTable').hide();
   dumpLog("Select the rows you would like to delete from the table.");
}

/*
 * Removes HTML rows for row entries with a checked checkbox.
 * Also removes entries for those rows from the reader database.
 * Returns user to initial home screen.
 */
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

/*
 * Shows the "About" dialog.
 */
function showAbout() {
   toggleMenu();
   alert("Radlib Demo Application\n© 2015 Team RadLib");
}






/* TESTING FUNCTIONS FOR DEBUGGING */

/*
 * Tests functionality of the reader database table.
 * Adds an object representing a reader to the reader database table.
 */
function testing(){
   var object = {};
   object.connection = "TestConnection";
   object.model = "TestModel";
   object.address = "12345 5 6";
   object.friendlyName = "DEBUG";

   db_initReaders();
   db_checkReaderEntries(object);
}

/*
 * Tests functionality of the tag database table.
 * Adds an object representing a read tag to the tag database table.
 */
function testpop(){
   var object = {};
   object.id = "12 34 56 78";
   object.firstSeen = "";
   object.friendlyName = "DEBUG1";
   object.count = 1;
   db_init();
   db_updateCount(object);
   db_print();
}

/*
 * Tests functionality of the tag database table
 * Adds another object representing a different read tag to the tag database table.
 */
function testpop2(){
   var object = {};
   object.id = "87 65 43 21";
   object.firstSeen = "";
   object.friendlyName = "DEBUG2";
   object.count = 1;
   db_init();
   db_updateCount(object);
   db_print();
}
