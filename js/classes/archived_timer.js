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
