function ArchivedTimer(name) {
	this.name = name;
	this.goal = 0;
	this.currentTime = 0;
	this.closingDate = 0;
	this.creationDate = 0;
}
ArchivedTimer.prototype.getCurrentDate = function() {
	return msToTime(this.currentTime);
};
ArchivedTimer.prototype.getCreationDate = function() {
	return msToTime(this.CreationDate);
};
ArchivedTimer.prototype.getClosingDate = function() {
	return msToTime(this.ClosingDate);
};
ArchivedTimer.prototype.getgoal = function() {
	return msToTime(this.goal);
};

	function msToTime(duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
		}