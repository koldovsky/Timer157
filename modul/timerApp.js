(function(){

    'use strict';

angular.module('timerApp', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider',function($routeProvider ) {
    $routeProvider
        .when('/tasks', {
            templateUrl: 'view/tasks.html',
            controller: 'TasksCtrl'
        })
        .when('/todo', {
            templateUrl: 'view/todo.html',
            controller: 'TodoCtrl'
        })
        .when('/statistics', {
            templateUrl: 'view/statistics.html',
            controller: 'StatCtrl'
        })
        .when('/archive', {
            templateUrl: 'view/archive.html',
            controller: 'ArchiveCtrl'
        })
        .otherwise({redirectTo: '/tasks'});


}]);


})();






