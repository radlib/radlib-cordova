module.exports = {	
	/**
		returns current time in HH:MM:SS string format
	*/
	getCurrentTime: function(){
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
};