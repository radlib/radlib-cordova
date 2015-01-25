
//toggles between start scanning for nearby bluetooth devices and stop scanning
function readStartStop(){
	if(document.getElementById("buttonStartStop").innerHTML == "Start Reading"){
		bluetoothScanner.connectStream(dumpLog, dumpLog, "");
		document.getElementById("buttonStartStop").innerHTML = "Stop Reading";
	}else{
		bluetoothScanner.stopDiscovery(dumpLog, dumpLog);
		document.getElementById("buttonStartStop").innerHTML = "Start Reading";
	}
}

//direct connec to OUR low freq bluetooth reader
function BTRFID(){
	bluetoothScanner.connectStream(dumpLog, dumpLog, "00:14:03:02:03:26");
}

/*
function countUp(){
	document.getElementById("status").innerHTML = Number(document.getElementById("status").innerHTML) + 1;
}*/

//returns current time in HH:MM:SS string format
function getCurrentTime(){
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

//testing
function testing(){
	var object = {};
	object.id = "20 50 60 70";
	
	object.firstSeen = getCurrentTime();
	
	
	object.reader = "bluetooth";
	updateTable(object);
}

//successful/unsuccessful callback function. currently used as a success/error dump
function dumpLog(data){
	document.getElementById("status").innerHTML = data;
}

//toggles turning on bluetooth on/off
function toggleBT(){
	if(document.getElementById("toggleBT").innerHTML == "Turn Bluetooth On"){
		bluetoothScanner.turnOnBT(dumpLog, dumpLog);
		document.getElementById("toggleBT").innerHTML = "Turn Bluetooth Off";
	}else{
		bluetoothScanner.turnOffBT(dumpLog, dumpLog);
		document.getElementById("toggleBT").innerHTML = "Turn Bluetooth On";
	}
}

//update table entries when an ID tag has been seen
function updateTable(object) {
    var table = document.getElementById("rfidTable");
	//check if id is in table
	for(var r = 1; r < table.rows.length; r++){
		if(table.rows[r].cells[0].innerHTML === object.id){
			//increment count
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
	timeRead.innerHTML = object.firstSeen;
	reader.innerHTML = object.reader;
	count.innerHTML = "1";
}
