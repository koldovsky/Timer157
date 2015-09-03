(function() {
'use strict';
angular.module('timerApp').service('TasksService', function(){
	this.tasks = [];
	this.todos = [];
	this.archive = [];
	
	this.getTasksList = function(){
    this.tasks = angular.fromJson(localStorage.getItem('taskList'));
		if(this.tasks){
			angular.forEach(this.tasks, function(task){
				if('limitSec' in task.timer){
					var limitSec = task.timer.limitSec;
					task.timer = new CountDown();
					task.timer.setLimitSec(limitSec);
					if(task.isRunning){
						var currentTime = task.currentTime - 
              (Date.now() - +localStorage.getItem('leaveTime'));
						if(currentTime){
							task.timer.setCurrentTime(currentTime);
						} else{
                task.timer.setCurrentTime(0);
                task.isRunning = false;
              }	
					} else task.timer.setCurrentTime(task.currentTime);
				} else{
            task.timer = new Timer();
            if(task.isRunning){
              task.timer.setCurrentTime(task.currentTime + 
                (Date.now() - +localStorage.getItem('leaveTime')));
            } else task.timer.setCurrentTime(task.currentTime);
          }
				task.currentTime = task.timer.getCurrentTime();
			});
		}	else this.tasks = [];
		return this.tasks;
	};
  
  this.addTask = function(newTask, index){
    var task = {
			name: newTask.name,
			isRunning: false,
      details: newTask.details
		};
    task.creationDate = (newTask.creationDate) ? newTask.creationDate : Date.now(); 
    if(!isNaN(parseInt(newTask.goal)) && isFinite(newTask.goal)){
      task.timer = new CountDown();	
      task.timer.setLimitSec(newTask.goal);
    } else task.timer = new Timer();
    if(typeof(index) !== 'undefined'){ 
      task.timer.setCurrentTime(newTask.currentTime);
      this.archive.splice(index, 1);
    }
    task.currentTime = task.timer.getCurrentTime();
		this.tasks.push(task);
    _this.saveData('taskList', 'archiveList');
	};
  
  this.removeTaskToArchive = function(index){
		var archive = new ArchivedTimer(this.tasks[index].name);
    var task = this.tasks[index];
		archive.currentTime = task.currentTime;
    archive.goal = ('limitSec' in task.timer) ? task.timer.limitSec : '-';
    archive.creationDate = task.creationDate;
    archive.closingDate = Date.now();
    archive.details = task.details;
    
    this.archive.push(archive);
    this.tasks.splice(index,1);
    _this.saveData('taskList', 'archiveList');
	};
	
	this.getTodosList = function(){
		if(localStorage.getItem('todoList')){
			this.todos = angular.fromJson(localStorage.getItem('todoList'));
		}	
		return this.todos;
	};
  
  this.addTodo = function(newTodo){
		var todo = {
			name: newTodo.name
		};
		this.todos.push(todo);
    _this.saveData('todoList');
	};
  
	this.removeTodo = function(index){
		this.todos.splice(index, 1);
    _this.saveData('todoList');
	};
  
  this.getArchiveList = function(){
		if(localStorage.getItem('archiveList')){
			this.archive = angular.fromJson(localStorage.getItem('archiveList'));
		}	
		return this.archive;
	};
  
	this.removeArchive = function(index){
		this.archive.splice(index,1);
    _this.saveData('archiveList');
	};
  
  this.removeAllArchive = function(){
    this.archive = [];
    _this.saveData('archiveList');
  };
  
  this.sortData = function(sortObject, sortProperty, sortFlag){
    var compare = function(a, b){
      if(sortProperty === 'goal'){
        if(a.timer.limitSec && b.timer.limitSec){
          return a.timer.limitSec > b.timer.limitSec;
        }
        if(!a.timer.limitSec) return -1;
        if(!b.timer.limitSec) return 1;  
      }
      return a[sortProperty] > b[sortProperty];
    };
    
    var sortArr;
    switch(sortObject){
      case 'taskList':
        sortArr = _this.tasks;
        break;
      case 'todoList':
        sortArr = _this.todos;
        break;  
      case 'archiveList':
        sortArr = _this.archive;
        break;  
    }
    if(!sortFlag) sortArr.sort(compare);
      else sortArr.reverse();
  };
  
  this.saveData = function(){
    if(arguments.length){
      localStorage.setItem('leaveTime', Date.now());
      angular.forEach(arguments, function(argument){
        switch(argument){
          case 'taskList':
            localStorage.setItem(argument, angular.toJson(_this.tasks));
            break;
          case 'todoList':
            localStorage.setItem(argument, angular.toJson(_this.todos));
            break;
          case 'archiveList':
            localStorage.setItem(argument, angular.toJson(_this.archive));
            break;    
        }
      });
    }
  };
  
  var _this = this;
  window.addEventListener('beforeunload', function(){
    _this.saveData('taskList', 'todoList', 'archiveList');
  });
});
})();