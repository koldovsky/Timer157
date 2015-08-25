(function(){

    'use strict';

angular.module('timerApp', [
    'ngRoute',
    'timerApp.todo',
    'timerApp.tasks',
    'timerApp.statistics',
    'timerApp.archive',
    'timerApp.version',
    'ngMaterial'
])

.config(['$routeProvider', function($routeProvider ) {
    $routeProvider.otherwise({redirectTo: '/tasks'});
}])

.controller('MainCtrl', function($scope) {


})

.controller('MenuCtrl', function($scope, $timeout, $mdSidenav, $mdUtil, $log) {

        $scope.menu = {};
        $scope.menu.pages = [
            {url: '/tasks', menuTitle:'Tasks', menuIcon: 'dns'},
            {url: '/todo', menuTitle:'Todo', menuIcon: 'loupe'},
            {url: '/statistics', menuTitle:'Statistics', menuIcon: 'equalizer'},
            {url: '/archive', menuTitle:'Archive', menuIcon: 'archive'}

        ];

        $scope.menu.isPageSelected = function(page) {
            return ($scope.menu.currentPage === page);
        };

        $scope.menu.toggleSelectPage = function(page) {
            $scope.menu.currentPage = page;
        };


        $scope.toggleRight = buildToggler('left');
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },200);
            return debounceFn;
        }


    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    });
})();






