(function() {
'use strict';
angular.module('timerApp').controller('TasksController', ['$scope', 'TasksService', '$timeout', function($scope, TasksService, $timeout){
	$scope.newTask = {
		name: '',
		goal: ''
	};
	
	$scope.addTask = function(){
		if($scope.newTask.name !== ''){
			$scope.newTask.creationDate = Date.now();
			TasksService.addTask($scope.newTask);
			$scope.newTask.name = '';
			$scope.newTask.goal = '';
			}
	};
	
	$scope.getTaskGoal = function(task){
		return ('getLimitSec' in task.timer) ? task.timer.getLimitSec() : '-';
	};
	
	$scope.isRunning = function(task){
		return task.isRunning;
	};
	
	$scope.showTime = function(task){
		task.currentTime = task.timer.getCurrentTime();
		if(task.currentTime){
			task.timerId = $timeout($scope.showTime, 1000, true, task)
		} else{
			task.isRunning = false;
		}	
	};
	
	$scope.startTask = function(task){
		task.timer.continueTimer();
		task.isRunning = true;
		task.timerId = $timeout($scope.showTime, 1000, true, task);
	};
	
	$scope.pauseTask = function(task){
		task.timer.pauseTimer();
		task.isRunning = false;
		task.currentTime = task.timer.getCurrentTime() / 1000;
		$timeout.cancel(task.timerId);
	};
	$scope.addArchivedTimer = function(task, index){
			TasksService.addArchivedTimer(task, index);
	};
	$scope.getTime  = function(duration){
		var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	};
	
	window.addEventListener('beforeunload', function(){
		TasksService.saveTasks();
	});
	$scope.tasks = TasksService.getTasksList();
	angular.forEach($scope.tasks, function(task){
		if(task.isRunning) $scope.startTask(task);
	});
}]);
})();