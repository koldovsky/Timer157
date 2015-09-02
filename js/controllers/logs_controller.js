(function() {
'use strict';
angular.module('timerApp').controller('LogsController', ['$scope', 'TasksService', 'LogsService', '$route', function($scope, TasksService, LogsService, $route){
     if(LogsService.logs.length !==0){
	     $scope.logs = LogsService.getLogs();
     }
	 $scope.deleteLog = function(index){
	     LogsService.deleteLog(index);
	 };
     $scope.deleteAllLogs = function(){
         LogsService.deleteAllLogs();
     }
}]);
})();