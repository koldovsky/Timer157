'use strict';
(function() {
angular.module('timerApp')
.controller('TasksController', ['$scope', 'TasksService', 'LogsService', '$interval', 'timeFormatFilter','$route', '$location',
function($scope, TasksService, LogsService, $interval, timeFormatFilter, $route, $location){  
	$scope.addTask = function(){
		if($scope.newTask.name !== ''){
      $scope.newTask.creationDate = Date.now();
      if($scope.newTask.goal) $scope.newTask.goal *= 1000;
			TasksService.addTask($scope.newTask);
			LogsService.addLog($scope.newTask, $route, $location);
			$scope.newTask.name = '';
			$scope.newTask.goal = '';
		}
	};
	
  $scope.removeTask = function(index){
      TasksService.removeTaskToArchive(index);
      $scope.getTotalTime();
  };
  
  $scope.getProgress = function(index){
    var task = $scope.tasks[index];
    if('limitSec' in task.timer){
      var progress = task.currentTime / task.timer.getLimitSec();
      return 100 - progress * 100;
    } else return 100;
  };
  
  $scope.removeAllTasks = function(){
    var tasksNumber = $scope.tasks.length;
    for(var i = 0; i < tasksNumber; i++){
      TasksService.removeTaskToArchive(0);
    }
    $scope.getTotalTime();
  };
  
  $scope.startTask = function(index){
    var task = $scope.tasks[index];
		task.timer.continueTimer();
    var detail = {
      startTime: Date.now(),
      endTime: '-',
      duration: '-'
    };
    task.details.push(detail);
		task.isRunning = true;
    $scope.runningTasksAmount++;
    if($scope.runningTasksAmount === 1){
      $scope.showTimeInterval = $interval($scope.showTime, 1000);
    }  
	};
  
  $scope.pauseTask = function(index){
    var task = $scope.tasks[index];
		task.timer.pauseTimer();
    var detail = task.details[task.details.length - 1];
    detail.endTime = Date.now();
    detail.duration = detail.endTime - detail.startTime;
		task.isRunning = false;
    $scope.runningTasksAmount--;
	};
  
  $scope.getTaskGoal = function(index){
		return ('limitSec' in $scope.tasks[index].timer) 
      ? timeFormatFilter($scope.tasks[index].timer.getLimitSec()) : '-';
	};
  
  $scope.getTotalTime = function(){
    $scope.totalTime = 0;
    angular.forEach($scope.tasks, function(task){
      if('limitSec' in task.timer){
        $scope.totalTime += task.timer.getLimitSec() - task.currentTime;
      } else $scope.totalTime += task.currentTime;
    });
  };
  
  $scope.getDetails = function(index){
    console.log($scope.tasks[index].details);
  };
  
  $scope.sortTasks = function(sortProperty){
    var sortFlag = ($scope.sortProperty === sortProperty) ? 1 : 0;  
    TasksService.sortData('taskList', sortProperty, sortFlag);
    $scope.sortProperty = sortProperty;
  };
  
  $scope.showTime = function(){
    angular.forEach($scope.tasks, function(task){
      if(task.isRunning){
        task.currentTime = task.timer.getCurrentTime();
        if(!task.currentTime){
          task.isRunning = false;
          $scope.runningTasksAmount--;
        }  
      }  
    });
    $scope.getTotalTime();
    if(!$scope.runningTasksAmount) $interval.cancel($scope.showTimeInterval);
	};

  $scope.$on('$routeChangeStart', function(){
    TasksService.saveData('taskList');
  });
	$scope.newTask = {
		name: '',
		goal: '',
		details: []
	};
	$scope.tasks = TasksService.getTasksList();
  $scope.getTotalTime();
  $scope.runningTasksAmount = 0;
  $scope.sortProperty = '';
	angular.forEach($scope.tasks, function(task, index){
    if(task.isRunning) $scope.startTask(index);
	});
  $scope.showTimeInterval = $interval($scope.showTime, 1000);
}]);
})();