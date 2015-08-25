'use strict';

angular.module('timerApp.statistics', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/statistics', {
    templateUrl: 'pages/statistics/statistics.html',
    controller: 'StatCtrl'
  });
}])

.controller('StatCtrl', function($scope) {

});