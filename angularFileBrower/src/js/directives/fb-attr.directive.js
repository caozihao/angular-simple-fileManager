(function (angular,$) {
    'use strict';
    angular.module('fb').directive('fbAttr', ['$q', 'Restangular', function ($q,Restangular) {
        return {
            require: 'ngModel',
            restrict: 'E',
            templateUrl: 'src/js/directives/templates/fb-attr.html',
            replace: true,
            scope: {
                ngModel: '=',
                fbModel: '=',
                fbSubmit: '='
            },
            link: function (scope, el, attr, ngModel) {
                scope.fbSchema = {};
                scope.fbForm = [];
                scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function (newValue) {
                    if (newValue) {
                        scope.fbSchema = newValue.schema;
                        scope.fbForm = newValue.form;
                    }
                });
                scope.onSubmit = function (form) {
                    // scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        if(typeof (scope.fbSubmit) == 'function'){
                            scope.fbSubmit(scope.fbModel);
                        }
                    }
                };

                scope.querySearch = function (txt,key) {
                    var config = {};
                    angular.forEach(scope.fbForm,function (v) {
                        if(v && v.key == key){
                            config = v;
                        }
                    });
                    return scope.prompt(txt,config);
                };

                scope.prompt = function (query,config) {
                    var deferred = $q.defer();
                    var url = config.url.split('?')[0];
                    var baseUrl = url.substring(0,url.lastIndexOf('/'));
                    var resource = url.substring(url.lastIndexOf('/') + 1);
                    var req = Restangular.oneUrl(resource,baseUrl);
                    if(config.method == 'POST'){
                        var postParam = {};
                        var getParam = {};
                        config.nameParamType == 'formData' ? postParam[config.nameParam] = query : getParam[config.nameParam] = query;
                        if(config.otherParam && config.otherParam.queryString){
                            $.extend(getParam,config.otherParam.queryString);
                        }
                        if(config.otherParam && config.otherParam.formData){
                            $.extend(postParam,config.otherParam.formData);
                        }
                        req.customPOST(postParam, resource, getParam).then(promptSuccess,promptError );
                    }else{
                        var param = {};
                        param[config.nameParam] = query;
                        if(config.otherParam && config.otherParam.queryString){
                            $.extend(param,config.otherParam.queryString);
                        }
                        req.customGET(param, resource).then(promptSuccess,promptError );
                    }
                    function promptSuccess(response) {
                        var data = response.plain();
                        if (data.code == '200') {
                            var result = config.dataFilter ? config.dataFilter(data,query) : data;
                            deferred.resolve(result);
                        } else {
                            deferred.reject(data);
                        }
                    }
                    function promptError(response) {
                        deferred.reject(response);
                    }
                    return deferred.promise;
                };
            }
        };
    }]);
})(angular,jQuery);