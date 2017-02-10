(function (window, angular) {
    'use strict';
    angular.module('fb.file').factory('fileFactory',service);

    service.$inject  = ['$translate', '$q', 'Restangular','$filter','fileConstant'];

    function  service($translate, $q, Restangular, $filter,fileConstant) {
        var Service = function(model) {
            var rawModel = {
                accessTime: model && model.accessTime || 0,
                blockSize: model && model.blockSize || 0,
                childrenNum: model && model.childrenNum || 0,
                fileId: model && model.fileId || 0,
                group: model && model.group || '',
                length: model && model.length || 0,
                owner: model && model.owner || '',
                modificationTime: model && model.modificationTime || 0,
                pathSuffix: model && model.pathSuffix || '',
                permission: model && model.permission || '755',
                replication: model && model.replication || 0,
                storagePolicy: model && model.storagePolicy || 0,
                type: model && model.type || 'DIRECTORY',
                content: model && model.content || '',
                xAttrs:model && model.xAttrs || [],
                sizeHuman: function() {
                    return $filter('humanReadableFileSize')(this.length);
                }
            };
            this.error = '';
            this.inprocess = false;
            this.model = angular.copy(rawModel);
            this.tempModel = angular.copy(rawModel);
        };

        Service.prototype.updateModel = function() {
            angular.extend(this.model, angular.copy(this.tempModel));
        };

        Service.prototype.deferredHandler = function(data, deferred, defaultMsg) {
            this.error = '';
            if (!data || typeof data !== 'object') {
                this.error = $translate.instant('Bridge response error, please check the docs');
            }
            if (data.code != '200' && data.msg) {
                this.error = data.msg;
            }
            if (!this.error && defaultMsg) {
                this.error = defaultMsg;
            }
            if (this.error) {
                return deferred.reject(data);
            }
            this.updateModel();
            return deferred.resolve(data);
        };

        Service.prototype.isFolder = function() {
            return 'DIRECTORY' === this.model.type;
        };
        Service.prototype.isEditable = function() {
            return !this.isFolder() && fileConstant.isEditableFilePattern.test(this.model.pathSuffix);
        };
        Service.prototype.isImage = function() {
            return fileConstant.isImageFilePattern.test(this.model.pathSuffix);
        };

        Service.prototype.get = function() {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var parentPath = self.fbInfo.path.substring(0,self.fbInfo.path.lastIndexOf('/'));
            var req = Restangular.all('v1'+ parentPath);
            req.customGET(self.tempModel.pathSuffix,{op:'GETFILESTATUS'}).then(function(response) {
                var data = response.plain();
                if(data.FileStatus){
                    self.tempModel = data.FileStatus;
                    self.deferredHandler(data,deferred);
                }else{
                    self.deferredHandler(data,deferred,$translate.instant('error_get'));
                }
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_get'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        Service.prototype.open = function() {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var parentPath = self.fbInfo.path.substring(0,self.fbInfo.path.lastIndexOf('/'));
            var req = Restangular.all('v1'+ parentPath);
            req.customGET(self.tempModel.pathSuffix,{op:'open'},{XMLHttpRequestResponseType: 'arraybuffer'}).then(function(response) {
                if(!response){
                    response = '';
                }
                self.tempModel.content = response;
                self.deferredHandler({code:200,data:response},deferred);
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_open'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        Service.prototype.mkdir = function(path) {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var req = Restangular.all('v1'+ self.fbInfo.path);
            req.customPUT({},path,{op:'MKDIRS'}).then(function(response) {
                var data = response.plain();
                if(data.boolean){
                    self.deferredHandler(data,deferred);
                }else{
                    self.deferredHandler(data,deferred,$translate.instant('error_mkdir'));
                }
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_mkdir'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        Service.prototype.rename = function(path) {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var parentPath = self.fbInfo.path.substring(0,self.fbInfo.path.lastIndexOf('/'));
            var req = Restangular.all('v1'+ parentPath);
            req.customPUT({},self.tempModel.pathSuffix,{op:'RENAME',destination:parentPath + '/' + path}).then(function(response) {
                var data = response.plain();
                if(data.boolean){
                    self.deferredHandler(data,deferred);
                }else{
                    self.deferredHandler(data,deferred,$translate.instant('error_rename'));
                }
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_rename'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        Service.prototype.delete = function() {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var parentPath = self.fbInfo.path.substring(0,self.fbInfo.path.lastIndexOf('/'));
            var req = Restangular.all('v1'+ parentPath);
            req.customDELETE(self.tempModel.pathSuffix,{op:'DELETE',recursive:true}).then(function(response) {
                var data = response.plain();
                if(data.boolean){
                    self.deferredHandler(data,deferred);
                }else{
                    self.deferredHandler(data,deferred,$translate.instant('error_delete'));
                }
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_delete'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        Service.prototype.list = function() {
            var self = this;
            var deferred = $q.defer();
            self.inprocess = true;
            var parentPath = self.fbInfo.path.substring(0,self.fbInfo.path.lastIndexOf('/'));
            var req = Restangular.all('v1'+ parentPath);
            req.customGET(self.tempModel.pathSuffix,{op : 'LISTSTATUS'}).then(function(response) {
                var data = response.plain();
                if(data.FileStatuses){
                    self.fbInfo.children = [];
                    angular.forEach(data.FileStatuses.FileStatus,function(v){
                        self.fbInfo.children.push(new Service(v));
                    });
                    self.deferredHandler(data,deferred);
                }else{
                    self.deferredHandler(data,deferred,$translate.instant('error_list_file'));
                }
                self.inprocess = false;
            },function(response){
                self.deferredHandler(response,deferred,$translate.instant('error_list_file'));
                self.inprocess = false;
            });
            return deferred.promise;
        };

        return Service;
    }
})(window, angular);