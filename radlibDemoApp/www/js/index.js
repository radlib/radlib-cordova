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

// testing
function testing(){
	var object = {};
	object.id = "20 50 60 70";
	object.firstSeen = resources.getCurrentTime();
	object.reader = "bluetooth";
	object.count = 1;

	db_init();
	db_updateCount(object);
	db_print();
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
	var db_object = {};
	db_object.id = object.id;
	db_object.reader = "LF Reader";
	if(object.report == "seen"){
		db_object.firstSeen = resources.getCurrentTime();
		db_updateCount(db_object);
	}else if(object.report == "lost"){
		//do nothing for now
	}
    /*var table = document.getElementById("tagsTable");
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
	count.innerHTML = "1";*/
}

// Creates a database of 5 MB called TAGS with fields [id, module, time_read, count]
function db_init() {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize, null);

	db.transaction(function (tx) {
		  tx.executeSql('CREATE TABLE IF NOT EXISTS TAGS(id, module, time_read, count)');
	});
}

// Checks to see if object is already in database and updates count or adds entry to database, accordingly
function db_updateCount(object) {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize);

	db.transaction(function (tx) {
	    tx.executeSql("SELECT * FROM TAGS WHERE id= '" + object.id + "'", [], function (tx, results) {
	    	// if no results are found
	    	if (results.rows.length == 0) {
	    		db_addEntry(object);
	    	}
	    	else {
	    		db_incrementCount(object);

	    	}
	    	db_print();
 		}, null);
	});
}

// Increments count for an object that exists in the database
function db_incrementCount(object) {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize);

	db.transaction(function (tx) {
		  tx.executeSql("UPDATE TAGS SET count = count + 1 WHERE id = '" + object.id + "'");
	});
}

// Adds a new entry for an object that does not yet exist in the database
function db_addEntry(object) {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize);

	db.transaction(function (tx) {
		tx.executeSql("INSERT INTO TAGS (id, module, time_read, count) VALUES(?,?,?,?)", [object.id, object.reader, object.firstSeen, 1], null, null);
	});

}

// Updates HTML table containing database entries
function db_print() {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize);
	var htmlTable;

	db.transaction(function (tx) {
	    tx.executeSql('SELECT * FROM TAGS', [], function (tx, results) {
		    var len = results.rows.length, i;
		    htmlTable = "<table id='tagsTable'>";
		    htmlTable += "<tr><th>ID Tag</th><th>RFID Module</th><th>Time Read</th><th>Count</th></tr>";

		    for (i = 0; i < len; i++){
		    	htmlTable += "<tr><th>" + results.rows.item(i).id + "</th><th>" + results.rows.item(i).module + "</th><th>" + results.rows.item(i).time_read + "</th><th>" + results.rows.item(i).count + "</th></tr>";
		    }

		    htmlTable += "</table>";
		    document.querySelector('#tagsDB').innerHTML = htmlTable;
 		}, null);
	});
}

// Clears contents of table
function db_clear() {
	var dbSize = 5 * 1024 * 1024;
	var db = openDatabase("testDatabase", "1.0", "Test DB", dbSize);

	db.transaction(function (tx) {
  		tx.executeSql('DROP TABLE TAGS');
	});

	document.querySelector('#tagsDB').innerHTML = "<table id='tagsTable'><tr><th>ID Tag</th><th>RFID Module</th><th>Time Read</th><th>Count</th></tr></table>";
}

function testCSV() {
	 var csvData = "";
	 db.transaction(function(tx){
	 tx.executeSql('SELECT * FROM LOGS', [], function (tx, results){
	 var len = results.rows.length, i;

	  for (i = 1; i < len; i++) {
	   csvData += results.rows.item(i).id + "," + results.rows.item(i).log + "\n";
	   }
	 window.location='data:text/csv;charset=utf8,' + encodeURIComponent(csvData);
	  });
 });
}
