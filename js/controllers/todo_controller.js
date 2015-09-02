(function() {
'use strict';
angular.module('timerApp').controller('TodoController', ['$scope',
	'TasksService',
	'LogsService',
	'$route',
	'$location',

	function($scope, TasksService, LogsService, $route, $location ) {
	$scope.todos = TasksService.getTodosList();

	$scope.todo = {
		name: ''
	};

	$scope.addTodo = function() {
		TasksService.addTodo($scope.todo);
		LogsService.addLog($scope.todo, $route, $location);
		$scope.todo = {};
	};
	
	$scope.removeTodo = function(index) {
		TasksService.removeTodo(index);
	};
	
	$scope.updateStorage = function() {

	};
	
	$scope.startTodo = function(index) {
		TasksService.addTask($scope.todos[index]);
		$scope.removeTodo(index);
	};
	
	$scope.removeTodo = function(index){
		TasksService.removeTodo(index);
	};
}]);
})();