

'use strict';

angular.module('timerApp.todo', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todo', {
    templateUrl: 'pages/todo/todo.html',
    controller: 'TodoCtrl'
  });
}])

.controller('TodoCtrl', function($scope) {
  	

});

