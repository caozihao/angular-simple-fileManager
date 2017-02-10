(function (window, angular) {
    'use strict';
    angular.module('fb').config(config);

    config.$inject  = ['$locationProvider','$urlRouterProvider','$stateProvider'];

    function config($locationProvider,$urlRouterProvider,$stateProvider) {
        $locationProvider.hashPrefix('!');

        
        $urlRouterProvider
            .when('', '/main');

        $stateProvider.state('main', {
            templateUrl: 'src/js/main/templates/main.html',
            url:'/main'
        });
    }
})(window, angular);