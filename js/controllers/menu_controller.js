(function() {

    'use strict';

    angular.module('timerApp').controller('MenuCtrl', function ($scope) {

        $scope.menu = {};
        $scope.menu.pages = [
            {url: '/tasks', menuTitle:'Tasks', menuIcon: 'dns'},
            {url: '/todo', menuTitle:'Todo', menuIcon: 'loupe'},
            {url: '/statistics', menuTitle:'Statistics', menuIcon: 'equalizer'},
            {url: '/archive', menuTitle:'Archive', menuIcon: 'archive'},
            {url: '/logs', menuTitle:'Logs', menuIcon: 'list'}

        ];

        $scope.menu.isPageSelected = function(page) {
            return ($scope.menu.currentPage === page);
        };

        $scope.menu.toggleSelectPage = function(page) {
            $scope.menu.currentPage = page;
        };

    });

})();

