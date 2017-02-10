(function (window, angular, $) {
    'use strict';
    angular.module('fb').config(config);

    config.$inject  = ['appConstant', 'RestangularProvider', '$mdThemingProvider', 'localStorageServiceProvider'];

    function config(appConstant, RestangularProvider, $mdThemingProvider,localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('fb');
        RestangularProvider.setBaseUrl(appConstant.restUrl);
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        RestangularProvider.setRequestInterceptor(function (element) {
            return $.param(element);
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .warnPalette('red');
    }
})(window, angular, jQuery);