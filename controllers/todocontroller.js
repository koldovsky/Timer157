(function() {
'use strict';
angular.module('timerApp').controller('TodoController', ['$scope', 'TasksService', function($scope, TasksService) {
	$scope.todos = TasksService.getTodosList();

	$scope.todo = {
		name: ''
	};

	$scope.addTodo = function() {
		TasksService.addTodo($scope.todo);
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
	
	window.addEventListener('beforeunload', function(){
		TasksService.saveTodos();
	});
}]);
})();