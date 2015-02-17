//TODO: MOVE THIS FILE WHERE IT NEEDS TO GO


// on success: returns a reader object
function DirectConnect(success, failure, requestedReader) {
	var id, type, time, day, frame;

	switch(requestedReader.connectType) {
		case "BLUETOOTH" :
			console.log("you requested bluetooth!"); // replace this with connect(stuff)
			//STUFF GOES HERE
		break;
	}

	var tagObj = {
		tagID: id,
		readerType: type,
		visibility: "seen",
		timeStamp: time,
		day: day,
		frame: frame
	};

	return tagObj;

}