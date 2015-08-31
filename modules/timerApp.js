(function(){

    'use strict';

angular.module('timerApp', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $routeProvider
        .when('/tasks', {
                templateUrl: 'views/tasks.html'
        })
        .when('/todo', {
            templateUrl: 'views/todo.html'
        })
        .when('/statistics', {
            templateUrl: 'views/statistics.html'
        })
        .when('/archive', {
            templateUrl: 'views/archive.html'
        })
        .otherwise({redirectTo: '/tasks'});


}]).controller("LocationCtrl", function($scope){
        $scope.baseUrl = window.location.pathname;
    });


})();






