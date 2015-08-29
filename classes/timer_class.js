function Timer() {
	this.startTime = 0;
	this.currentTime = 0;
}
Timer.prototype.getStartTime = function(){
	return this.startTime;
};
Timer.prototype.startTimer = function() {
	this.startTime = Date.now();
	this.currentTime = 0;
};
Timer.prototype.clearTimer = function() {
	this.startTime = 0;
	this.currentTime = 0;
};
Timer.prototype.pauseTimer = function() {
	if(this.startTime) {
		this.currentTime = Date.now() - this.startTime + this.currentTime;
		this.startTime = 0;
	}
};
Timer.prototype.continueTimer = function() {
	if(!this.startTime) {
		this.startTime = Date.now();
	}	
};
Timer.prototype.getCurrentTime = function() {
	var currentTime = (this.startTime) ? (Date.now() - this.startTime + this.currentTime) : this.currentTime;
	return currentTime;
};
Timer.prototype.setCurrentTime = function(currentTime){
	this.currentTime = currentTime;
};

function CountDown() {
	this.startTime = 0;
	this.currentTime = 0;
	this.limitSec = 0;
	this.timerId = 0;
}
CountDown.prototype = Object.create(Timer.prototype);
CountDown.prototype.setLimitSec = function(limit) {
	if(!isNaN(parseFloat(limit)) && isFinite(limit)) { 
		this.limitSec = limit * 1000;
		this.currentTime = limit * 1000;
	}
};
CountDown.prototype.getLimitSec = function() {
	 return '' + (this.limitSec / 1000);
};
CountDown.prototype.startTimer = function() {
	clearTimeout(this.timerId);
	this.startTime = Date.now();
	var _this = this;
	this.timerId = setTimeout(function() {
		_this.startTime = 0; 
		_this.currentTime = 0; 
	}, this.limitSec);
};
CountDown.prototype.clearTimer = function() {
	this.startTime = 0;
	this.currentTime = this.limitSec;
	clearTimeout(this.timerId);
};
CountDown.prototype.pauseTimer = function() {
	if(this.startTime) {
		this.currentTime = this.currentTime - (Date.now() - this.startTime);
		this.startTime = 0;
		clearTimeout(this.timerId);
	}
};
CountDown.prototype.continueTimer = function() {
	if(!this.startTime) {
		this.startTime = Date.now();
		var _this = this;
		this.timerId = setTimeout(function() {
			_this.startTime = 0; 
			_this.currentTime = 0;
		}, this.currentTime);
	}
};
CountDown.prototype.getCurrentTime = function() {
	var currentTime = (this.startTime) ? (this.currentTime - (Date.now() - this.startTime)) : this.currentTime;
	currentTime = (currentTime < 0) ? 0 : currentTime;
	return currentTime;
};