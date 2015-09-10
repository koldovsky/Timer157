(function() {
    'use strict';
    angular.module('timerApp')
    .controller('DialogCtrl', function($scope, $mdDialog) {
        $scope.showAdvanced = function() {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/task-details.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        };
    });

    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    }

})();
