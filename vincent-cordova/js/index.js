function readStartStop(){
	if(document.getElementById("buttonStartStop").innerHTML == "Start Reading"){
		//bluetoothSerial.connect("AA:00:AA:00:AA:00", successful, unsuccessful);
		document.getElementById("buttonStartStop").innerHTML = "Stop Reading";
	}else{
		document.getElementById("buttonStartStop").innerHTML = "Start Reading";
	}
}

function successful(){
	document.getElementById("buttonStartStop").innerHTML = "Connected!!";
}

function unsuccessful(){
	document.getElementById("buttonStartStop").innerHTML = "Unsuccessful!";
}