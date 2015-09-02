(function() {
'use strict';
angular.module('timerApp').service('LogsService', function(){
        if(localStorage.getItem('logs')){
            this.logs = angular.fromJson(localStorage.getItem('logs'));
        } else {
            this.logs = [];    
        }
	   this.addLog = function(task, route, loc){
		 this.log = {
             id: 1
         }
		var tempId = angular.fromJson(localStorage.getItem('logs'));
        if (tempId !== null ){
            if(tempId.length !== 0){
            tempId = tempId[tempId.length-1].id + 1;
		    this.log.id = tempId;
            }
		}
        if (task.goal !== ''){
            this.log.timerType = 'Countdown';
        } else {
            this.log.timerType = 'Stopwatch';
        }
        if(!('goal' in task)){
            this.log.timerType = 'Todo';
        }
		var regExp = /=".*Controller"/ig;
		var regRes = regExp.exec(route.current.locals.$template);
		var controller = regRes[0].replace(/="/i, ''); 
		controller = controller.replace(/"/i,'');	
		this.log.name = task.name;
		this.log.templateUrl = route.current.templateUrl;
		this.log.controller = controller;
		this.log.loc = loc.absUrl();
		this.log.date = Date();
		this.logs.push(this.log);
		localStorage.setItem('logs', angular.toJson(this.logs));
	};
	this.getLogs = function(){
		this.logs = angular.fromJson(localStorage.getItem('logs'));
		return this.logs;
	};
	this.deleteLog = function(index){
		this.logs.splice(index,1);
		localStorage.setItem('logs', angular.toJson(this.logs));
	}
    this.deleteAllLogs = function(){
        this.logs.splice(0,this.logs.length);
		localStorage.setItem('logs', angular.toJson(this.logs));
	}
});
})();