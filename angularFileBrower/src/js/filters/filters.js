(function(angular) {
    'use strict';
    var app = angular.module('fb');

    app.filter('strLimit', ['$filter', function($filter) {
        return function(input, limit, widthoutPointer) {
            if(!input){
                return '';
            }
            if (input.length <= limit) {
                return input;
            }
            return $filter('limitTo')(input, limit) + (!widthoutPointer ? '...' : '');
        };
    }]);

    app.filter('formatDate', [function() {
        return function(input) {
            var str = '';
            if(typeof(input) == 'number'){
                input = new Date(input);
            }
            str = input instanceof Date ?
                input.toISOString().substring(0, 19).replace('T', ' ') :
                (input.toLocaleString || input.toString).apply(input);
            return str;
        };
    }]);

    app.filter('fileExtension', ['$filter', function($filter) {
        return function(input) {
            return /\./.test(input) && $filter('strLimit')(input.split('.').pop(), 3, '..') || '';
        };
    }]);

    app.filter('humanReadableFileSize', ['$filter', 'appConstant', function($filter, appConstant) {
        var decimalByteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        var binaryByteUnits = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        return function(input) {
            var i = -1;
            var fileSizeInBytes = input;
            do {
                fileSizeInBytes = fileSizeInBytes / 1024;
                i++;
            } while (fileSizeInBytes > 1024);
            var result = appConstant.useBinarySizePrefixes ? binaryByteUnits[i] : decimalByteUnits[i];
            return Math.max(fileSizeInBytes, 0.1).toFixed(1) + ' ' + result;
        };
    }]);

})(angular);
