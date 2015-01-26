/*toggles between start scanning for nearby bluetooth devices and stop scanning
for parsed values
*/
function scanConnectLFParsed(){
	if(document.getElementById("buttonScanIOParsed").innerHTML == "Scan for Readers IO Parsed"){
		bluetoothScanner.connectParsed(updateTable, dumpLog, "");
		document.getElementById("buttonScanIOParsed").innerHTML = "Stop Scan";
	}else{
		bluetoothScanner.stopDiscovery(dumpLog, dumpLog);
		document.getElementById("buttonScanIOParsed").innerHTML = "Scan for Readers IO Parsed";
	}
}

//direct connec to OUR low freq bluetooth reader for parsed results
function directConnectLFParsed(){
	bluetoothScanner.connectParsed(updateTable, dumpLog, "00:14:03:02:03:26");
}

/*toggles between start scanning for nearby bluetooth devices and stop scanning
for IO Stream
*/
function scanConnectLFStream(){
	if(document.getElementById("buttonScanIOStream").innerHTML == "Scan for Readers IO Stream"){
		bluetoothScanner.connectStream(dumpLog, dumpLog, "");
		document.getElementById("buttonScanIOStream").innerHTML = "Stop Scan";
	}else{
		bluetoothScanner.stopDiscovery(dumpLog, dumpLog);
		document.getElementById("buttonScanIOStream").innerHTML = "Scan for Readers IO Stream";
	}
}

//direct connect to OUR low freq bluetooth reader for IO Stream
function directConnectLFStream(){
	bluetoothScanner.connectStream(dumpLog, dumpLog, "00:14:03:02:03:26");
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

//update table entries when an ID tag has been seen
function updateTable(object) {
    var table = document.getElementById("rfidTable");
	//check if id is in table by checking the values in the leftmost column
	for(var r = 1; r < table.rows.length; r++){
		if(table.rows[r].cells[0].innerHTML === object.id){
			//increment count, knowing that count is on the rightmost side of the table
			table.rows[r].cells[3].innerHTML = Number(table.rows[r].cells[3].innerHTML) + 1;
			return;
		}
    }
	//add new entry
    var row = table.insertRow(1);
    var id = row.insertCell(0);
    var reader = row.insertCell(1);
	var timeRead = row.insertCell(2);
	var count = row.insertCell(3);
	id.innerHTML = object.id;
	reader.innerHTML = "LF Reader";
	timeRead.innerHTML = resources.getCurrentTime();
	count.innerHTML = "1";
}
