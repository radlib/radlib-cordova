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
   // db_printReaders();
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

/*function getStream() {
   var dropdown = document.getElementById("reader_selector");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;

   if (selectedReader == "scan") {
      bluetoothUtils.stopDiscovery(dumpLog, dumpLog);
   }
   else if (selectedReader == "tsl_1128") {
      radlib.connect(dumpLog, dumpLog, objTSL1128, "STREAM");
   }
   else if (selectedReader == "rc522_lf") {
      radlib.connect(dumpLog, dumpLog, objRC522, "STREAM");
   }
   else {
      alert("Please select a reader");
   }
}*/

function getParsed() {
   var dropdown = document.getElementById("reader_selector");
   var selectedReader = dropdown.options[dropdown.selectedIndex].value;

   if (selectedReader == "scan") {
      radlib.scan(deleteMe, dumpLog, ["BLUETOOTH"]);
   }
   else if (selectedReader == "tsl_1128") {
      radlib.connect(updateTable, dumpLog, objTSL1128);
   }
   else if (selectedReader == "rc522_lf") {
      radlib.connect(updateTable, dumpLog, objRC522);
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
   object.connection = "poop";
   object.model = "Test";
   object.address = "12345 5 6";
   object.friendlyName = "Tali";
              console.log("Im here in testing");
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
   radlib.connect(updateTable, dumpLog, {connection:"CAMERA"});
}

function startdel() {
   $('.del').show();
   $('.testonly').hide();
}

// Remove HTML rows for rows with a checked checkbox
function finishdel() {
   $('.del').hide();
   $('.testonly').show();
   $('#tagsTable').find('tr').each(
      function() {
         var row = $(this);
         //console.log(row);
         if (row.find('input[type="checkbox"]').is(':checked')) {
            //console.log("A checkbox in row" + row[0].rowIndex + "was checked!!!");
            //console.log("to delete: " + row[0].cells[0].innerHTML)
            var objToDelete = {};
            objToDelete.id = row[0].cells[0].innerHTML;
            db_deleteEntry(objToDelete);
            row.remove();
         }
      }
   );
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
