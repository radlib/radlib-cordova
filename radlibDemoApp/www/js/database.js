//update table entries when an ID tag has been seen
function updateTable(object) {
	var db_object = {};
	var dropdown = document.getElementById("reader_selector");
	var selectedReader = dropdown.options[dropdown.selectedIndex].value;
	db_object.id = object.id;

	if (selectedReader == "tsl_1128") {
		db_object.reader = "TSL 1128 UHF";
	}
	else if (selectedReader == "rc522_lf") {
		db_object.reader = "RC552 LF";
	}

	if(object.report == "seen"){
		db_object.firstSeen = resources.getCurrentTime();
		db_updateCount(db_object);
	}else if(object.report == "lost"){
		//do nothing for now
	}
}

function db_initAndLoad() {
	db_init();
	db_print();
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

	var result = confirm("Are you sure you want to clear the database?");
	
	if (result == true) {
		db.transaction(function (tx) {
  			tx.executeSql('DROP TABLE TAGS');
		});

		document.querySelector('#tagsDB').innerHTML = "<table id='tagsTable'><tr><th>ID Tag</th><th>RFID Module</th><th>Time Read</th><th>Count</th></tr></table>";
		alert("Database cleared!");
		db_init();
	}

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
