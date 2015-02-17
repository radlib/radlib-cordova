function getStream() {
	var dropdown = document.getElementById("reader_selector");
	var selectedReader = dropdown.options[dropdown.selectedIndex].value;

	if (selectedReader == "scan") {
		scanConnectLFStream();
	}
	else if (selectedReader == "tsl_1128") {
		directConnectUHFStream();
	}
	else if (selectedReader == "rc522_lf") {
		directConnectLFStream();
	}
	else {
		alert("Please select a reader");
	}
}

function getParsed() {
	var dropdown = document.getElementById("reader_selector");
	var selectedReader = dropdown.options[dropdown.selectedIndex].value;

	if (selectedReader == "scan") {
		scanConnectLFParsed(); // this is bad we need a way to select the reader
	}
	else if (selectedReader == "tsl_1128") {
		directConnectUHFParsed();
	}
	else if (selectedReader == "rc522_lf") {
		directConnectLFParsed();
	}
	else {
		alert("Please select a reader");
	}
}


/*toggles between start scanning for nearby bluetooth devices and stop scanning
for parsed values
*/
function scanConnectLFParsed(){
	bluetoothScanner.connectParsed(updateTable, dumpLog, "");
}

//direct connect to OUR low freq bluetooth reader for parsed results
function directConnectLFParsed(){
	bluetoothScanner.connectParsed(updateTable, dumpLog, "00:14:03:02:03:26");
}

//direct connect to OUR hi freq bluetooth reader for parsed results
function directConnectUHFParsed(){
	bluetoothScanner.connectUHFParsed(updateTable, dumpLog, "20:14:05:08:15:63");
}

/*toggles between start scanning for nearby bluetooth devices and stop scanning
for IO Stream
*/
function scanConnectLFStream(){
	bluetoothScanner.connectStream(dumpLog, dumpLog, "");
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

//direct connect to OUR low freq bluetooth reader for IO Stream
function directConnectLFStream(){
	bluetoothScanner.connectStream(dumpLog, dumpLog, "00:14:03:02:03:26");
}

//direct connect to OUR low freq bluetooth reader for IO Stream
function directConnectUHFStream(){
	bluetoothScanner.connectStream(dumpLog, dumpLog, "20:14:05:08:15:63");
}


//successful/unsuccessful callback function. currently used as a success/error dump
function dumpLog(data){
	document.getElementById("status").innerHTML = data;
}

//toggles turning on bluetooth on/off
function toggleBT(){
	if(document.getElementById("buttonToggleBT").innerHTML == "Turn Bluetooth On"){
		bluetoothScanner.turnOnBT(dumpLog, dumpLog);
		document.getElementById("buttonToggleBT").innerHTML = "Turn Bluetooth Off";
	}else{
		bluetoothScanner.turnOffBT(dumpLog, dumpLog);
		document.getElementById("buttonToggleBT").innerHTML = "Turn Bluetooth On";
	}
}