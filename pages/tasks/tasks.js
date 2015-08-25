'use strict';

angular.module('timerApp.tasks', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: 'pages/tasks/tasks.html',
    controller: 'TasksCtrl'
  });
}])

.controller('TasksCtrl', function($scope) {

});