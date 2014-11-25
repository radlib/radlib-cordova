
function readStartStop(){
	if(document.getElementById("buttonStartStop").innerHTML == "Start Reading"){
		bluetoothScanner.scan(successful, unsuccessful);
		document.getElementById("buttonStartStop").innerHTML = "Stop Reading";
	}else{
		bluetoothScanner.stop(successful, unsuccessful);
		document.getElementById("buttonStartStop").innerHTML = "Start Reading";
	}
}

function successful(data){
	document.getElementById("status1").innerHTML = data;
}

function unsuccessful(data){
	document.getElementById("status2").innerHTML = data;
}