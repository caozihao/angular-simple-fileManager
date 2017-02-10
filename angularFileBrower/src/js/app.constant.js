(function (window, angular) {
    'use strict';

    angular.module('fb').constant('appConstant', {
        defaultLang: 'zh_cn',
        defaultViewType: 'list',
        useBinarySizePrefixes: false,
        restUrl:'/webhdfs'
    });

})(window, angular);
