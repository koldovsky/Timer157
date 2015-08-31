(function() {

    'use strict';

    angular.module('timerApp').controller('MenuCtrl', function ($scope, $mdSidenav, $mdUtil, $log) {

        $scope.menu = {};
        $scope.menu.pages = [
            {url: '/tasks', menuTitle:'Tasks', menuIcon: 'dns'},
            {url: '/todo', menuTitle:'Todo', menuIcon: 'loupe'},
            {url: '/statistics', menuTitle:'Statistics', menuIcon: 'equalizer'},
            {url: '/archive', menuTitle:'Archive', menuIcon: 'archive'}

        ];

        $scope.menu.currentPage = $scope.menu.pages[0];

        $scope.menu.isPageSelected = function(page) {
            return ($scope.menu.currentPage === page);
        };

        $scope.menu.toggleSelectPage = function(page) {
            $scope.menu.currentPage = page;
        };


        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

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


    });

})();

