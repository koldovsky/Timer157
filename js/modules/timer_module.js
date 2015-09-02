(function(){

    'use strict';

angular.module('timerApp', ['ngRoute', 'ngMaterial','nvd3ChartDirectives' ])

.config(['$routeProvider', function($routeProvider){

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


}]);


})();







