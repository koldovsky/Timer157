'use strict';

angular.module('timerApp.archive', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/archive', {
    templateUrl: 'pages/archive/archive.html',
    controller: 'ArchiveCtrl'
  });
}])

.controller('ArchiveCtrl', function($scope) {
  	


});

