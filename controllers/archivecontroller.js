(function() {
'use strict';
angular.module('timerApp').controller('ArchiveController', ['$scope', 'TasksService', function($scope, TasksService){
	
	$scope.getTime  = function(duration){
		var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	};
	$scope.addTaskFromArchive = function(atimer, index){
			TasksService.addTaskFromArchive(atimer, index);
	};	
	$scope.deleteFromArchive = function(index){
			TasksService.deleteFromArchive(index);
	};
//		
	window.addEventListener('beforeunload', function(){
		TasksService.saveArchive();
	});
	
	$scope.archive = TasksService.getArchiveList();
}]);
})();