function turnOnBluetooth(){
    bluetoothUtils.turnOnBluetooth(success, failure);
}

function success(successMsg){
    alert("Success :" + successMsg);
}

function failure(failureMsg){
    alert("Failure :" + failureMsg);
}

function scan(){
    radlib.scan(printScan,failure, ["BLUETOOTH"]);
}

function printScan(array){
   for(var i = 0; i < array.length; i++){
      alert("Name: " + array[i].name + "\n" + 
            "Address: " + array[i].address + "\n" +
            "ConnectionType: " + array[i].connectionType);
   }
}


var readerObj = {};
//mandatory
readerObj.model = "ARDUINO_RC522_HF";
readerObj.address = "00:14:03:02:03:26";
readerObj.connectionType = "BLUETOOTH";

//optional
readerObj.friendlyName = "my device";

function connect(){
    radlib.connect(printConnect,failure,readerObj);
}

function printConnect(obj){

    document.getElementById("display").innerHTML = "ID: " + obj.id + "<br>" +
                                        "Reader: " + obj.reader + "<br>" +
                                        "Time: " + obj.time + "<br>" +
                                        "Date: " + obj.date + "<br>" +
                                        "Frame: " + obj.frame + "<br>" +
                                        "Friendly Name: " + obj.friendlyName + "<br>";
}
