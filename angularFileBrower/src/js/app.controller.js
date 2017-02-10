(function (window, angular) {
    'use strict';
    angular.module('fb').controller('fbController', fbController);

    fbController.$inject  = ['localStorageService','Restangular'];

    function fbController(localStorageService,Restangular) {
        var ctrl = this;

        ctrl.store = null;
        if(localStorageService.isSupported) {
            ctrl.store = localStorageService;
        }else if(localStorageService.cookie.isSupported){
            ctrl.store = localStorageService.cookie;
        }
        ctrl.userId = ctrl.store.get('userId');
        ctrl.token = ctrl.store.get('token');
        Restangular.setDefaultRequestParams({'userId': ctrl.userId,'token': ctrl.token});
    }
})(window, angular);