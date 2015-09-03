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
     };
	 $scope.sortData = function(sortProperty, sortFlag){
		 var sortFlag = ($scope.sortProperty === sortProperty) ? 1 : 0; 
		var compare = function(a, b){
        return a[sortProperty] > b[sortProperty];
    };
    if(!sortFlag) $scope.logs.sort(compare);
      else $scope.logs.reverse();
	  $scope.sortProperty = sortProperty;
  };
  $scope.sortProperty = '';
}]);
})();