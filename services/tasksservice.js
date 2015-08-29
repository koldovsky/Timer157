(function() {
'use strict';
angular.module('timerApp').service('TasksService', function(){
	this.tasks = [];
	this.todos = [];
	this.archive = [];
	
	this.getTasksList = function(){
		if(localStorage.getItem('taskList')){
			this.tasks = angular.fromJson(localStorage.getItem('taskList'));
			angular.forEach(this.tasks, function(task){
				if(task.timer.limitSec){
					var limitSec = task.timer.limitSec / 1000;
					task.timer = new CountDown();
					task.timer.setLimitSec(limitSec);
					if(task.isRunning){
						var currentTime = task.currentTime - (Date.now() - +localStorage.getItem('leaveTime'));
						if(currentTime){
							task.timer.setCurrentTime(currentTime);
						} else{
							task.timer.setCurrentTime(0);
							task.isRunning = false;
						}	
					} else {
						task.timer.setCurrentTime(task.currentTime);
					}
				} else{
					task.timer = new Timer();
					if(task.isRunning){
						task.timer.setCurrentTime(task.currentTime + Date.now() - +localStorage.getItem('leaveTime'));
					} else {
						task.timer.setCurrentTime(task.currentTime);
					}
				}

				task.currentTime = task.timer.getCurrentTime();
			});
		}	
		return this.tasks;
	};
	
	this.getTodosList = function(){
		if(localStorage.getItem('todoList')){
			this.todos = angular.fromJson(localStorage.getItem('todoList'));
		}	
		return this.todos;
	};
	
	this.saveTasks = function(){
		localStorage.setItem('leaveTime', Date.now());
		localStorage.setItem('taskList', angular.toJson(this.tasks));
	};
	
	this.saveTodos = function(){
		localStorage.setItem('leaveTime', Date.now());
		localStorage.setItem('todoList', angular.toJson(this.todos));
	};
	
	this.saveArchives = function(){
		localStorage.setItem('leaveTime', Date.now());
		localStorage.setItem('archiveList', angular.toJson(this.archives));
	};
	
	
	this.addTask = function(newTask){
		var task = {
			name: newTask.name,
			currentTime: 0,
			isRunning: false,
			creationDate: Date.now()
		};
		if(parseInt(newTask.goal)){
			task.timer = new CountDown();	
			task.timer.setLimitSec(newTask.goal);
			task.currentTime = task.timer.getCurrentTime();
		} else{
			task.timer = new Timer();
		}
		task.currentTime = task.timer.getCurrentTime() / 1000;
		this.tasks.push(task);
		localStorage.setItem('taskList', angular.toJson(this.tasks));
	};
	
	this.addTodo = function(newTodo){
		var todo = {
			name: newTodo.name
		};
		this.todos.push(todo);
		localStorage.setItem('todoList', angular.toJson(this.todos));
	};
	this.removeTodo = function(index){
		this.todos.splice(index, 1);
		localStorage.setItem('todoList', angular.toJson(this.todos));
	};
	
	this.addArchivedTimer = function(task,index){
		var atimer = new ArchivedTimer(task.name);
			atimer.currentTime = this.tasks[index].currentTime;
			atimer.goal = (isNaN(task.timer.limitSec)) ? '-':task.timer.limitSec/1000;
			atimer.creationDate = task.creationDate;
			atimer.closingDate = Date.now();
		 	
			this.archive.push(atimer);
			localStorage.setItem('archiveList', angular.toJson(this.archive));
			this.tasks.splice(index,1);
			localStorage.setItem('taskList', angular.toJson(this.tasks));
	};
	
	this.getArchiveList = function(){
		if(localStorage.getItem('archiveList')){
			this.archive = angular.fromJson(localStorage.getItem('archiveList'));
		}	
		return this.archive;
	};
	
	this.addTaskFromArchive = function(atimer,i){
		var task = {
			name: atimer.name,
			currentTime: atimer.currentTime,
			isRunning: false,
			creationDate: atimer.creationDate
		};
		if(parseInt(atimer.goal)){
			task.timer = new CountDown();	
			task.timer.limitSec = atimer.goal * 1000;
			task.timer.currentTime = atimer.currentTime * 1000;
		} else{
			task.timer = new Timer();
			task.timer.currentTime = atimer.currentTime * 1000;
		}
		task.currentTime = atimer.currentTime;
		this.tasks.push(task);
		this.archive.splice(i, 1);
		localStorage.setItem('taskList', angular.toJson(this.tasks));
	};
	this.deleteFromArchive = function(index){
		this.archive.splice(index,1);
		localStorage.setItem('archiveList', angular.toJson(this.archive));
	};
	this.saveArchive = function(){
		localStorage.setItem('archiveList', angular.toJson(this.archive));
	};
	this.msToTime = function (duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
		};
});

})();