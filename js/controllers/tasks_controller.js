(function() {
'use strict';
angular.module('timerApp')
.controller('TasksController', ['$scope', 'TasksService', 'LogsService', '$interval', 'timeFormatFilter','$route', '$location',
function($scope, TasksService, LogsService, $interval, timeFormatFilter, $route, $location){
	$scope.addTask = function(){
		if($scope.newTask.name !== ''){
      if($scope.newTask.goal) $scope.newTask.goal *= 1000;
			TasksService.addTask($scope.newTask);
            LogsService.addLog($scope.newTask, $route, $location);
			$scope.newTask.name = '';
			$scope.newTask.goal = '';
		}
	};
	
	$scope.removeTask = function(index){
			TasksService.removeTaskToArchive(index);
	};
  
  $scope.startTask = function(index){
		$scope.tasks[index].timer.continueTimer();
		$scope.tasks[index].isRunning = true;
    $scope.runningTasksAmount++;
    if($scope.runningTasksAmount === 1){
      $scope.showTimeInterval = $interval($scope.showTime, 1000);
    }  
	};
  
  $scope.pauseTask = function(index){
		$scope.tasks[index].timer.pauseTimer();
		$scope.tasks[index].isRunning = false;
    $scope.runningTasksAmount--;
	};
  
  $scope.getTaskGoal = function(index){
		return ('limitSec' in $scope.tasks[index].timer) 
      ? timeFormatFilter($scope.tasks[index].timer.getLimitSec()) : '-';
	};
  
  $scope.showTime = function(){
    $scope.totalTime = 0;
    angular.forEach($scope.tasks, function(task){
      if(task.isRunning){
        task.currentTime = task.timer.getCurrentTime();
        if(!task.currentTime){
          task.isRunning = false;
          $scope.runningTasksAmount--;
        }  
      }  
      $scope.totalTime += task.currentTime;
    });
    if(!$scope.runningTasksAmount) $interval.cancel($scope.showTimeInterval);
	};

  $scope.$on('$routeChangeStart', function(){
    TasksService.saveData('taskList');
  });
  
  $scope.totalTime = 0;
	$scope.newTask = {
		name: '',
		goal: ''
	};
	$scope.tasks = TasksService.getTasksList();
  $scope.runningTasksAmount = 0;
	angular.forEach($scope.tasks, function(task, index){
    if(task.isRunning) $scope.startTask(index);
    $scope.totalTime += task.currentTime;
	});
  $scope.showTimeInterval = $interval($scope.showTime, 1000);
}]);
})();