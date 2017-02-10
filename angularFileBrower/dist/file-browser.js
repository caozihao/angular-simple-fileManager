(function (window, angular) {
    'use strict';
    angular.module('fb', ['pascalprecht.translate', 'ngMaterial', 'ui.router','as.sortable','angularResizable',
        'fb.main']);
})(window, angular);
(function (window, angular) {
    'use strict';
    angular.module('fb.file', ['pascalprecht.translate', 'ngMaterial', 'restangular']);

})(window, angular);



(function (window, angular) {
    'use strict';
    angular.module('fb.main', ['pascalprecht.translate', 'LocalStorageModule', 'ngMaterial',
        'ui.router', 'restangular','fb.file','schemaForm','ngSchemaFormFile']);

})(window, angular);



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
(function (window, angular) {
    'use strict';

    angular.module('fb').constant('appConstant', {
        defaultLang: 'zh_cn',
        defaultViewType: 'list',
        useBinarySizePrefixes: false,
        restUrl:'/webhdfs'
    });

})(window, angular);

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
(function(angular) {
    'use strict';
    angular.module('fb').config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', {
            language: 'Language',
            chinese: 'Chinese',
            english: 'English',
            confirm: 'Confirm',
            cancel: 'Cancel',
            close: 'Close',
            finish: 'Finish',
            success: 'Success',
            failed: 'Failed',
            save: 'Save',
            complete: 'Complete',
            add: 'Add',
            insert: 'Insert',
            select: 'Select',
            loading: 'Loading',
            search: 'Search',
            name: 'Name',
            size: 'Size',
            date: 'Date',
            copy:'Copy',
            go_back: 'Go back',
            download: 'Download',
            remove: 'Delete',
            edit: 'Edit',
            update: 'Update',
            config:'Config',
            filter:'Filter',
            user:'User',
            public:'Public',
            private:'Private',
            login:'Login',
            username:'Username',
            password:'Password',
            mobile:'Mobile',
            captcha:'Captcha',
            register:'Register',
            logout:'Logout',
            grid_view:'Grid View',
            list_view:'List View',
            change_sidenav:'Change Sidenav',
            change_language:'Change Language',
            not_debug_mode:'Mode Type',
            list_resizeable:'Col Resizable'
        });

		$translateProvider.translations('zh_cn', {
            language: '语言',
            chinese: '中文',
            english: '英语',
            confirm: '确认',
            cancel: '取消',
            close: '关闭',
            finish: '完成',
            success: '成功',
            failed: '失败',
            save: '保存',
            complete: '完成',
            add:'添加',
            insert:'插入',
            select: '选择',
            loading: '加载中',
            search: '搜索',
            name: '名称',
            size: '大小',
            date: '日期',
            copy:'复制',
            go_back: '返回',
            download: '下载',
            remove: '删除',
            edit: '编辑',
            update: '更新',
            config:'配置',
            filter:'筛选',
            user:'用户',
            public:'公开',
            private:'私有',
            login:'登录',
            username:'用户名',
            password:'密码',
            mobile:'手机号',
            captcha:'验证码',
            register:'注册',
            logout:'退出',
            grid_view:'切换为网格显示',
            list_view:'切换为列表显示',
            change_sidenav:'显示/隐藏左边栏',
            change_language:'切换语言',
            not_debug_mode:'数据模式',
            list_resizeable:'自定义列宽'
        });
        
        $translateProvider.preferredLanguage('zh_cn');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }]).config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', {
            'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
            'modules.attribute.fields.required.caption': 'Required',
            'modules.upload.descriptionMultifile': 'Drop your file(s) here',
            'modules.upload.descriptionSinglefile': 'Drop your file here',
            'buttons.add': 'Open file browser',
            'modules.upload.field.filename': 'Filename',
            'modules.upload.field.preview': 'Preview',
            'modules.upload.multiFileUpload': 'Multifile upload',
            'modules.upload.field.progress': 'Progress',
            'buttons.upload': 'Upload',
            'buttons.upload.complete': 'Upload Complete'
        });
        $translateProvider.translations('zh_cn', {
            'modules.upload.dndNotSupported': '您的浏览器暂不支持拖拽上传',
            'modules.attribute.fields.required.caption': '此内容不能为空',
            'modules.upload.descriptionMultifile': '把文件拖到此处',
            'modules.upload.descriptionSinglefile': '把文件拖到此处',
            'buttons.add': '浏览',
            'modules.upload.field.filename': '文件名',
            'modules.upload.field.preview': '预览',
            'modules.upload.multiFileUpload': '批量上传',
            'modules.upload.field.progress': '上传进度',
            'buttons.upload': '上传',
            'buttons.upload.complete': '上传已完成'
        });
        $translateProvider.preferredLanguage('zh_cn');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');

    }]);
})(angular);
/*
 * JQuery areaSelect v0.2.1
 * http://www.hiekn.com/
 *
 * Copyright (c) 2015 sofia
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: 451183365@qq.com
 * Date: 2015-10-30
 */
(function (window,angular) {
	'use strict';
	angular.module('fb').directive('fbAreaSelect', [function () {
		return {
			restrict: 'A',
			link: function (scope, el, attr) {
				/**
				 * TODO Area Select function
				 * */
				// console.log(el);
				window.console.log(attr);
			}
		};
	}]);
})(window,angular); 
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
(function(angular,$) {
    'use strict';
    angular.module('fb').directive('fbList', ['$timeout','$mdToast', '$mdPanel', '$log','$window',function($timeout,$mdToast,$mdPanel,$log,$window) {
        return {
            require: 'ngModel',
            restrict: 'E',
            templateUrl:'src/js/directives/templates/fb-list.html',
            replace:true,
            scope:{
                fbClick: '=',
                ngModel: '=',
                fbSelectNode: '=',
                fbSelectNodes: '=',
                fbPathNodes: '=',
                fbFilter: '=',
                fbListItemGridTemplateUrl: '=',
                fbPathName:'=',
                fbItemIcon:'=',
                fbSortCompare:'=',
                fbSearchNodeFilter:'=',
                fbNodeConfig:'=',
                fbView:'=',
                fbResizeable:'=',
                fbRightClick:'='
            },
            link: function(scope, el, attr,ngModel) {
                scope.topIndex = 0;
                scope.allNode = [];
                scope.allGridNode = [];
                scope.initNode = [];
                scope.fbSelectNodes = [];
                scope.fbLastSelectNodesIndex = -1;
                scope.fbShiftStartIndex = -1;
                scope.inEditPath = false;
                scope.nowPath = '';
                scope.sortItem = '';
                scope.sortBy = 'asc';
                scope.searchText = '';
                scope.perWidth = 116;
                scope.perLine = 10;
                scope.timeout = null;

                var w = angular.element($window);
                w.on('resize', function () {
                    clearTimeout(scope.timeout);
                    scope.timeout = setTimeout(function () {
                        scope.allGridNode = scope.resetGridItem();
                    },800);
                });
                scope.dragControlListeners = {
                    clone: false,
                    allowDuplicates: false
                };
                scope.resetGridItem = function () {
                    var w = el.width();
                    scope.perLine = Math.floor(w / scope.perWidth);
                    var allNode = [];
                    var items = [];
                    var all = scope.allNode.length - 1;
                    angular.forEach(scope.allNode,function (v,i) {
                        if(i % scope.perLine == 0 && i != 0){
                            allNode.push(items);
                            items = [];
                        }
                        items.push(v);
                        if(i == all){
                            allNode.push(items);
                            items = [];
                        }
                    });
                    return allNode;
                };
                scope.$on('angular-resizable.resizeEnd', function (event,info) {
                    event.targetScope.$parent.itemData().width = info.width;
                });
                scope.loadPath = function (parent) {
                    if(parent){
                        scope.fbSelectNode = parent;
                    }else{
                        scope.fbSelectNode = null;
                    }
                };
                scope.getChildren = function (parent) {
                    if(typeof(scope.fbClick) === 'function'){
                        parent.isLoading = true;
                        var d = scope.fbClick(parent);
                        if(d){
                            d.then(function (nodes) {
                                if(nodes && nodes.length){
                                    scope.initNodesInfo(nodes,{},parent);
                                    parent.fbInfo.children = nodes;
                                    scope.fbSelectNode = parent;
                                    parent.fbInfo.isOpen = true;
                                }
                                parent.isLoading = false;
                            });
                        }else{
                            parent.isLoading = false;
                        }
                    }
                };
                scope.clickEmpty = function (ev) {
                    if(!ev.shiftKey){
                        scope.fbSelectNodes = [];
                        // scope.fbLastSelectNodesIndex = -1;
                    }
                };
                scope.isSelectedNode = function (item) {
                    var isSelect = false;
                    angular.forEach(scope.fbSelectNodes,function (v) {
                        if(!isSelect && v.fbInfo.path == item.fbInfo.path){
                            isSelect = true;
                        }
                    });
                    return isSelect;
                };
                scope.isLastClickNode = function (item) {
                    return scope.fbLastSelectNodesIndex != -1 && scope.allNode[scope.fbLastSelectNodesIndex].fbInfo.path == item.fbInfo.path;
                };
                scope.click = function (parent,ev,indx) {
                    if(!indx){
                        angular.forEach(scope.allNode,function (v,i) {
                            if(parent.fbInfo.path == v.fbInfo.path){
                                indx = i;
                            }
                        });
                    }
                    if(!ev.shiftKey){
                        scope.fbShiftStartIndex = -1;
                    }
                    if(scope.fbShiftStartIndex == -1){
                        scope.fbShiftStartIndex = indx;
                    }
                    var start = scope.fbShiftStartIndex != -1 ? scope.fbShiftStartIndex : scope.fbLastSelectNodesIndex;
                    if(ev.shiftKey && start > -1){
                        scope.fbSelectNodes = [];
                        if(start <= indx){
                            angular.forEach(scope.allNode,function (v,i) {
                                if(i >= start && i <= indx){
                                    scope.fbSelectNodes.push(v);
                                }
                            });
                        }else{
                            angular.forEach(scope.allNode,function (v,i) {
                                if(i <= start && i >= indx){
                                    scope.fbSelectNodes.push(v);
                                }
                            });
                        }
                        scope.fbLastSelectNodesIndex = indx;
                    }else{
                        if(ev.ctrlKey){
                            var ex = false;
                            angular.forEach(scope.fbSelectNodes,function (v,i) {
                                if(v.fbInfo.path == parent.fbInfo.path){
                                    ex = true;
                                    scope.fbSelectNodes.splice(i,1);
                                }
                            });
                            if(!ex){
                                scope.fbSelectNodes.push(parent);
                            }
                        }else{
                            scope.fbSelectNodes = [parent];
                        }
                        scope.fbLastSelectNodesIndex = indx;
                    }
                    ev.stopPropagation();
                };
                scope.getItemStatus = function (item) {
                    return item.isLoading ? 'sync' : scope.fbItemIcon ? typeof(scope.fbItemIcon) === 'function' ? scope.fbItemIcon(item) : scope.fbItemIcon : 'folder';
                };
                scope.$watch(function(){
                    return ngModel.$modelValue;
                }, function(newValue){
                    if(newValue){
                        scope.allNode = scope.initNode = newValue;
                        scope.allGridNode = scope.resetGridItem();
                        scope.initNodesInfo(scope.initNode);
                    }
                });
                scope.$watch('fbSelectNode', function(newValue,oldValue){
                    if(newValue){
                        if(newValue != oldValue){
                            scope.allNode = scope.fbSelectNode.fbInfo.children;
                            scope.allGridNode = scope.resetGridItem();
                            scope.nowPath = scope.fbSelectNode.fbInfo.path;
                            scope.sortItem = '';
                            scope.fbSelectNodes = [];
                            scope.fbLastSelectNodesIndex = -1;
                        }
                    }else{
                        scope.allNode = scope.initNode;
                        scope.allGridNode = scope.resetGridItem();
                        scope.nowPath = '/';
                        scope.sortItem = '';
                        scope.fbSelectNodes = [];
                        scope.fbLastSelectNodesIndex = -1;
                    }
                });
                scope.searchNode = function (ev) {
                    var keycode = window.event ? ev.keyCode : ev.which;
                    if (keycode == 13) {
                        var startTime = new Date().getTime();
                        var list = scope.fbSelectNode ? scope.fbSelectNode.fbInfo.children : scope.initNode;
                        scope.allNode = scope.findNode(list,scope.searchText);
                        scope.allGridNode = scope.resetGridItem();
                        $log.info('Search Node at : ',new Date().getTime() - startTime,' ms');
                    }
                };
                scope.findChildByPath = function (children,path) {
                    var node = null;
                    angular.forEach(children,function (v) {
                        if(!node && path == v.fbInfo.path){
                            node = v;
                        }
                    });
                    return node;
                };
                scope.findNodeByPath = function (children,path) {
                    var node = scope.findChildByPath(children,path);
                    if(node){
                        return node;
                    }else{
                        angular.forEach(children,function (v) {
                            if(!node){
                                node = scope.findChildByPath(v.fbInfo.children,path);
                            }
                        });
                    }
                    return node;
                };
                scope.findNode = function (children,query) {
                    var list = [];
                    if(typeof(scope.fbSearchNodeFilter) === 'function'){
                        angular.forEach(children,function (v) {
                            if(scope.fbSearchNodeFilter(v,query)){
                                list.push(v);
                            }
                            angular.forEach(scope.findNode(v.fbInfo.children,query),function (vv) {
                                if (scope.fbSearchNodeFilter(vv,query)) {
                                    list.push(vv);
                                }
                            });
                        });
                    }
                    return list;
                };
                scope.getItemPathName = function (item) {
                    var paths = item.fbInfo.path.split('/');
                    return paths[paths.length - 1];
                };
                scope.goPath = function (ev) {
                    var keycode = window.event ? ev.keyCode : ev.which;
                    if (keycode == 13) {
                        if(scope.nowPath.length > 1){
                            if(scope.nowPath.substring(scope.nowPath.length - 1) == '/'){
                                scope.nowPath = scope.nowPath.substring(0,scope.nowPath.length - 1);
                            }
                            var node = scope.findNodeByPath(scope.initNode,scope.nowPath);
                            if(node){
                                scope.fbSelectNode = node;
                                scope.inEditPath = false;
                            }else{
                                scope.showSimpleToast('请输入正确的路径搜索');
                            }
                        }else{
                            if(scope.nowPath == '/' || scope.nowPath == ''){
                                scope.fbSelectNode = null;
                                scope.inEditPath = false;
                            }
                        }
                    }
                };
                scope.leaveEditPath = function () {
                    scope.inEditPath = false;
                };
                scope.editPath = function () {
                    scope.inEditPath = true;
                    $timeout(function () {
                        $('#path-editor').focus();
                    },300);
                };
                scope.showSimpleToast = function (text) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(text)
                            .position('top right')
                            .hideDelay(3000)
                    );
                };
                scope.sort = function (attr) {
                    var startTime = new Date().getTime();
                    scope.sortItem == attr ? scope.sortBy == 'asc' ? scope.sortBy ='desc':scope.sortBy ='asc' : scope.sortItem = attr;
                    var compare = scope.fbSortCompare || function (key,desc) {
                        if(desc){
                            return function(a,b){
                                var aKey = a;
                                var bKey = b;
                                if(key.indexOf('.') > 0){
                                    var ks = key.split('.');
                                    for(var i in ks){
                                        aKey = aKey[ks[i]];
                                        bKey = bKey[ks[i]];
                                    }
                                }
                                return aKey < bKey;
                            };
                        }else{
                            return function(a,b){
                                var aKey = a;
                                var bKey = b;
                                if(key.indexOf('.') > 0){
                                    var ks = key.split('.');
                                    for(var i in ks){
                                        aKey = aKey[ks[i]];
                                        bKey = bKey[ks[i]];
                                    }
                                }
                                return aKey > bKey;
                            };
                        }
                    };
                    // var insertSort = function (array,fn) {
                    //     for(var i = 1;i < array.length;i++){
                    //         var key = array[i];
                    //         var j = i - 1;
                    //         while(j >= 0 && fn(array[j],key)){
                    //             array[j+1] = array[j];
                    //             j--;
                    //         }
                    //         array[j + 1] = key;
                    //     }
                    // };
                    var isArray = function (arr) {
                        if(Object.prototype.toString.call(arr) =='[object Array]'){
                            return true;
                        }else{
                            return false;
                        }
                    };
                    var merge = function(left,right,fn){
                        var result=[];
                        if(!isArray(left)){
                            left = [left];
                        }
                        if(!isArray(right)){
                            right = [right];
                        }
                        while(left.length > 0&& right.length >0){
                            if(fn(left[0],right[0])){
                                result.push(left.shift());
                            }else{
                                result.push(right.shift());
                            }
                        }
                        return result.concat(left).concat(right);
                    };
                    var mergeSort = function(arr,fn){
                        var len=arr.length;
                        var lim ,work=[];
                        var i,j,k;
                        if(len ==1){
                            return arr;
                        }
                        for(i=0;i<len;i++){
                            work.push(arr[i]);
                        }
                        work.push([]);
                        for(lim=len;lim>1;){
                            for(j=0,k=0;k<lim;j++,k=k+2){
                                work[j]=merge(work[k],work[k+1],fn);
                            }
                            work[j]=[];
                            lim=Math.floor((lim+1)/2);
                        }
                        return work[0];
                    };
                    var fn = compare(attr,scope.sortBy == 'desc');
                    // insertSort(scope.allNode,fn);
                    scope.allNode = mergeSort(scope.allNode,fn);
                    scope.allGridNode = scope.resetGridItem();
                    scope.fbLastSelectNodesIndex = -1;
                    scope.fbShiftStartIndex = -1;
                    $log.info('Sort at : ',new Date().getTime() - startTime,' ms');
                    // var worker =new Worker("../workers/sort.js");
                    // worker.postMessage({
                    //     sortBy : scope.sortBy,
                    //     sortItem : scope.sortItem,
                    //     allNode : scope.allNode
                    // });
                    // worker.onmessage = function(evt){
                    //     scope.allNode = evt.data;
                    //     scope.allGridNode = scope.resetGridItem();
                    // }
                };
                scope.rightClickItem = function (item,ev,indx) {
                    if(!ev.shiftKey && !ev.ctrlKey){
                        if(item){
                            if(!scope.isSelectedNode(item)){
                                scope.fbSelectNodes = [item];
                                scope.fbLastSelectNodesIndex = indx;
                            }
                        }else{
                            scope.fbSelectNodes = [];
                            // scope.fbLastSelectNodesIndex = -1;
                        }
                    }
                    scope.fbRightClick(ev,item,scope.fbSelectNode,scope.fbSelectNodes);
                };
                scope.rightClickTitle = function (ev) {
                    var position = $mdPanel.newPanelPosition().absolute()
                        .top(ev.clientY + 'px')
                        .left(ev.clientX + 'px');
                    var animation = $mdPanel.newPanelAnimation();
                    animation.openFrom({top:ev.clientY + 'px', left:ev.clientX + 'px'});
                    animation.closeTo({top:ev.clientY + 'px', left:ev.clientX + 'px'});
                    animation.withAnimation({
                        open: 'right-click-animation-open',
                        close: 'right-click-animation-close'
                    });
                    var panelConfig = {
                        animation: animation,
                        attachTo: angular.element(document.body),
                        controllerAs: 'vm',
                        controller: ['mdPanelRef', 'items', function (mdPanelRef, items) {
                            var vm = this;
                            vm.items = items;
                            vm.cancel = function () {
                                mdPanelRef.close();
                            };
                        }],
                        templateUrl: 'src/js/directives/templates/fb-list-title-right-click.html',
                        panelClass: 'right-click-panel',
                        position: position,
                        locals: {items: scope.fbNodeConfig},
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        focusOnOpen: false
                    };
                    $mdPanel.open(panelConfig);
                    ev.stopPropagation();
                };
                scope.isLastTitle = function (item) {
                    var last = '';
                    angular.forEach(scope.fbNodeConfig,function (v) {
                        if(v.show){
                            last = v.name;
                        }
                    });
                    return last == item.name;
                };
                scope.isFirstField = function (item) {
                    var first = '';
                    angular.forEach(scope.fbNodeConfig,function (v) {
                        if(!first && v.show){
                            first = v.name;
                        }
                    });
                    return first == item.name;
                };
                scope.initNodesInfo = function (nodes,info,parent) {
                    angular.forEach(nodes,function (v) {
                        !v.fbInfo && (v.fbInfo = {});
                        !v.fbInfo.isOpen && (v.fbInfo.isOpen = info && info.isOpen || false);
                        !v.fbInfo.hide && (v.fbInfo.hide = info && info.hide || false);
                        !v.fbInfo.children && (v.fbInfo.children = info && info.children || []);
                        !v.fbInfo.pathName && (v.fbInfo.pathName = typeof(scope.fbPathName) === 'function' ? scope.fbPathName(v) : '');
                        !v.fbInfo.path && (v.fbInfo.path = (parent ? parent.fbInfo.path : '') + '/' + v.fbInfo.pathName);
                        v.fbInfo.level = v.fbInfo.path.split('/').length - 2;
                        v.fbInfo.parent = parent;
                    });
                };
            }
        };
    }]);
})(angular,jQuery);
 
(function(angular) {
    'use strict';
    angular.module('fb').directive('ngRightClick', ['$parse', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event: event});
                });
            });
        };
    }]);
 
})(angular);

(function(angular) {
    'use strict';
    angular.module('fb').directive('fbTree', ['$log', function($log) {
        return {
            require: 'ngModel',
            restrict: 'E',
            templateUrl:'src/js/directives/templates/fb-tree.html',
            replace:true,
            scope:{
                fbAfterExpend: '=',
                fbLoad: '=',
                ngModel: '=',
                fbSelectNode: '=',
                fbPathNodes: '=',
                fbFilter: '=',
                fbTreeItemTemplateUrl: '=',
                fbPathName: '=',
                fbRightClick: '=',
                fbItemIcon: '=',
                fbUpdate: '='
            },
            link: function(scope, el, attr,ngModel) {
                scope.topIndex = 0;
                scope.remainSelectState = false;
                scope.initNode = [];
                scope.allShowNode = [];
                scope.allNode = [];
                scope.listNode = function (parent) {
                    scope.remainSelectState = true;
                    if(parent.fbInfo.children.length){
                        if(typeof(scope.fbAfterExpend) === 'function'){
                            scope.fbAfterExpend(parent.fbInfo.children);
                        }
                        scope.fbSelectNode = parent;
                    }else{
                        if(typeof(scope.fbLoad) === 'function'){
                            parent.isLoading = true;
                            var startTime = new Date().getTime();
                            scope.fbLoad(parent).then(function (nodes) {
                                $log.info('Load All Node at : ',new Date().getTime() - startTime,' ms');
                                scope.initNodesInfo(nodes,{hide: true},parent);
                                parent.fbInfo.children = nodes;
                                scope.fbSelectNode = parent;
                                if(typeof(scope.fbAfterExpend) === 'function'){
                                    scope.fbAfterExpend(nodes);
                                }
                                parent.isLoading = false;
                            });
                        }
                    }
                };
                scope.toggleNode = function (parent,ev) {
                    if(!parent.fbInfo.isOpen){
                        if(parent.fbInfo.children.length){
                            angular.forEach(parent.fbInfo.children,function (v) {
                                v.fbInfo.hide = false;
                            });
                            scope.getAllNode();
                            parent.fbInfo.isOpen = !parent.fbInfo.isOpen;
                        }else{
                            if(typeof(scope.fbLoad) === 'function'){
                                parent.isLoading = true;
                                var startTime = new Date().getTime();
                                scope.fbLoad(parent).then(function (nodes) {
                                    $log.info('Load All Node at : ',new Date().getTime() - startTime,' ms');
                                    scope.initNodesInfo(nodes,{},parent);
                                    parent.fbInfo.children = nodes;
                                    scope.getAllNode();
                                    parent.fbInfo.isOpen = !parent.fbInfo.isOpen;
                                    parent.isLoading = false;
                                });
                            }
                        }
                    }else{
                        angular.forEach(parent.fbInfo.children,function (v) {
                            v.fbInfo.hide = true;
                        });
                        scope.getAllNode();
                        parent.fbInfo.isOpen = !parent.fbInfo.isOpen;
                    }
                    ev.stopPropagation();
                };
                scope.$watch('fbSelectNode', function(newValue,oldValue){
                    if(newValue){
                        if(newValue != oldValue){
                            scope.allNode = scope.getAllChildrenNode(scope.initNode);
                            scope.fbPathNodes = [];
                            scope.showNode(scope.fbSelectNode);
                            scope.fbPathNodes.reverse();
                            scope.getAllNode();
                            if(!scope.remainSelectState){
                                angular.forEach(scope.allShowNode,function (v,i) {
                                    if(v.fbInfo.path == scope.fbSelectNode.fbInfo.path){
                                        scope.topIndex = i > 3 ? i - 3 : i;
                                    }
                                });
                            }else{
                                scope.remainSelectState = false;
                            }
                        }
                    }else{
                        scope.fbPathNodes = [];
                    }
                });
                scope.$watch('fbUpdate', function(newValue){
                    if(newValue){
                        scope.fbUpdate = false;
                        scope.allNode = scope.getAllChildrenNode(scope.initNode);
                        scope.getAllNode();
                    }
                });
                scope.$watch(function(){
                    return ngModel.$modelValue;
                }, function(newValue){
                    if(newValue){
                        scope.initNode = newValue;
                        scope.initNodesInfo(scope.initNode);
                        scope.getAllNode();
                    }
                });
                scope.getItemStatus = function (item) {
                    return item.isLoading ? 'sync' : scope.fbItemIcon ? typeof(scope.fbItemIcon) === 'function' ? scope.fbItemIcon(item) : scope.fbItemIcon : 'folder';
                };
                scope.getAllNode = function () {
                    var startTime = new Date().getTime();
                    scope.allShowNode = scope.getChildrenNode(scope.initNode);
                    $log.info('Gent All Node at : ',new Date().getTime() - startTime,' ms');
                };
                scope.getChildrenNode = function (children) {
                    var list = [];
                    angular.forEach(children,function (v) {
                        if(!v.fbInfo.hide && (typeof(scope.fbFilter) === 'function' ? scope.fbFilter(v):true)){
                            list.push(v);
                            angular.forEach(scope.getChildrenNode(v.fbInfo.children),function (vv) {
                                if(!v.fbInfo.hide && (typeof(scope.fbFilter) === 'function' ? scope.fbFilter(v):true)) {
                                    list.push(vv);
                                }
                            });
                        }
                    });
                    return list;
                };
                scope.getAllChildrenNode = function (children) {
                    var list = [];
                    angular.forEach(children,function (v) {
                        list.push(v);
                        angular.forEach(scope.getAllChildrenNode(v.fbInfo.children),function (vv) {
                            list.push(vv);
                        });
                    });
                    return list;
                };
                scope.showNode = function (node) {
                    scope.fbPathNodes.push(node);
                    node.fbInfo.hide = false;
                    var path = node.fbInfo.path.substring(0,node.fbInfo.path.lastIndexOf('/'));
                    if(path){
                        angular.forEach(scope.allNode,function (v) {
                            if(v.fbInfo.path == path){
                                v.fbInfo.isOpen = true;
                                angular.forEach(v.fbInfo.children,function (vv) {
                                    vv.fbInfo.hide = false;
                                });
                                scope.showNode(v);
                            }
                        });
                    }
                };
                scope.rightClickItem = function (item,ev) {
                    scope.fbRightClick(ev,item,scope.fbSelectNode);
                };
                scope.initNodesInfo = function (nodes,info,parent) {
                    angular.forEach(nodes,function (v) {
                        !v.fbInfo && (v.fbInfo = {});
                        !v.fbInfo.isOpen && (v.fbInfo.isOpen = info && info.isOpen || false);
                        !v.fbInfo.hide && (v.fbInfo.hide = info && info.hide || false);
                        !v.fbInfo.children && (v.fbInfo.children = info && info.children || []);
                        !v.fbInfo.pathName && (v.fbInfo.pathName = typeof(scope.fbPathName) === 'function' ? scope.fbPathName(v) : '');
                        !v.fbInfo.path && (v.fbInfo.path = (parent ? parent.fbInfo.path : '') + '/' + v.fbInfo.pathName);
                        v.fbInfo.level = v.fbInfo.path.split('/').length - 2;
                        v.fbInfo.parent = parent;
                    });
                };
            }
        };
    }]);
})(angular);
(function (window, angular) {
    'use strict';

    angular.module('fb.file').constant('fileConstant', {
        schemas : [
            {
                name:'fileSchema',
                showName:'文件',
                type:0,
                schema:{
                    'type': 'object',
                    'properties': {
                        'attr': {
                            'type': 'array',
                            'title': '属性',
                            'items': {
                                'type': 'string',
                                'enum': [
                                    '只读',
                                    '隐藏'
                                ]
                            }
                        },
                        'createDate': {
                            'title': '创建日期',
                            'type': 'string',
                            'default': new Date(),
                            'format': 'date'
                        },
                        'type': {
                            'title': '类型',
                            'type': 'string',
                            'enum': [
                                '文件',
                                'DOC',
                                'PNG'
                            ]
                        },
                        'fileName': {
                            'title': '文件名',
                            'type': 'string'
                        },
                        'description': {
                            'title': '文件描述',
                            'type': 'string',
                            'maxLength': 200,
                            'validationMessage': '描述不能超过200字'
                        },
                        'length': {
                            'title': '文件大小',
                            'default': 0,
                            'type': 'number'
                        }
                    },
                    'required': [
                        'fileName'
                    ]
                },
                form : [
                    'fileName',
                    'type',
                    'length',
                    'createDate',
                    {
                        'key': 'description',
                        'type': 'textarea'
                    },
                    'attr'
                ]
            },
            {
                name:'DOCSchema',
                parentName:'fileSchema',
                showName:'DOC文件',
                type:100,
                schema:{
                    'type': 'object',
                    'properties': {
                        'radio': {
                            'title': '是否有效',
                            'type': 'string',
                            'enum': [
                                '1',
                                '0'
                            ]
                        },
                        'accessPassword': {
                            'title': '访问密码',
                            'type': 'string'
                        },
                        'isPublic': {
                            'title': '是否公开',
                            'type': 'number',
                            'default': 1,
                            'titleMap': {
                                'true': '1',
                                'false': '0'
                            }
                        },
                        'authorEmail': {
                            'title': '作者邮箱',
                            'type': 'string',
                            'pattern': '^\\S+@\\S+$'
                        },
                        'author': {
                            'title': '作者',
                            'type': 'object'
                        },
                        'participants': {
                            'type': 'array',
                            'title': '参与者信息',
                            'items': {
                                'title':'信息',
                                'type': 'object',
                                'properties': {
                                    'username': {
                                        'title': '姓名',
                                        'type': 'string'
                                    },
                                    'sex': {
                                        'title': '性别',
                                        'type': 'string',
                                        'enum': [
                                            '男',
                                            '女'
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    'required': [
                        'author'
                    ]
                },
                form : [
                    {
                        'key': 'author',
                        'type': 'autocomplete',
                        'url': 'http://kg.hiekn.com:28888/cbnode_ws/search/get/prompt',
                        'nameParam': 'prefix',
                        'method': 'POST',
                        'dataFilter':function (data,query) {
                            var result = [];
                            result.push({
                                name:query,
                                value:query
                            });
                            if (data.data.rsData.length) {
                                angular.forEach(data.data.rsData, function (item) {
                                    angular.forEach(item.tips, function (v) {
                                        v.tip.value = v.tip.name;
                                        result.push(v.tip);
                                    });
                                });
                            }
                            return result;
                        }
                    },
                    {
                        'key': 'authorEmail',
                        'type': 'email'
                    },
                    {
                        'key': 'participants',
                        'add': '添加'
                    },
                    {
                        'key': 'isPublic',
                        'type': 'switch'
                    },
                    {
                        'key': 'accessPassword',
                        'type': 'password'
                    },
                    {
                        'key': 'radio',
                        'type': 'radios-inline',
                        'titleMap': [
                            {
                                'value': '1',
                                'name': '有效'
                            },
                            {
                                'value': '0',
                                'name': '无效'
                            }
                        ]
                    }
                ]
            },
            {
                name:'PNGSchema',
                parentName:'fileSchema',
                showName:'PNG文件',
                type:200,
                schema:{
                    'type': 'object',
                    'properties': {
                        'image':  {
                            'title':         '封面',
                            'type':          'array',
                            'format':        'singlefile',
                            'x-schema-form': {
                                'type': 'array'
                            },
                            'pattern':       {
                                'mimeType':          '*/*',
                                'validationMessage': 'Falscher Dateityp: '
                            },
                            'maxSize':       {
                                'maximum':            '2MB',
                                'validationMessage':  'Erlaubte Dateigröße überschritten: ',
                                'validationMessage2': 'Aktuelle Dateigröße: '
                            },
                            'maxItems':      {
                                'validationMessage': 'Es wurden mehr Dateien hochgeladen als erlaubt.'
                            },
                            'minItems':      {
                                'validationMessage': 'Sie müssen mindestens eine Datei hochladen'
                            }
                        },
                        'images': {
                            'title':         '相册',
                            'type':          'array',
                            'format':        'multifile',
                            'x-schema-form': {
                                'type': 'array'
                            },
                            'pattern':       {
                                'mimeType':          'image/*,!.gif',
                                'validationMessage': 'Falscher Dateityp: '
                            },
                            'maxSize':       {
                                'maximum':            '2MB',
                                'validationMessage':  'Erlaubte Dateigröße überschritten: ',
                                'validationMessage2': 'Aktuelle Dateigröße: '
                            },
                            'maxItems':      {
                                'validationMessage': 'Es wurden mehr Dateien hochgeladen als erlaubt.'
                            },
                            'minItems':      {
                                'validationMessage': 'Sie müssen mindestens eine Datei hochladen'
                            }
                        }
                    },
                    'required': [
                        'image'
                    ]
                },
                form : [
                    {
                        'key':      'image',
                        'type':     'nwpFileUpload',
                        'formDataName': 'fileData',
                        'endpoint': 'http://kg.hiekn.com:28888/cbnode_ws/userreport/add/file?token=a68da3ec8c0a474cb91628992ff59522&userId=261'
                    },
                    {
                        'key':      'images',
                        'type':     'nwpFileUpload',
                        'formDataName': 'fileData',
                        'endpoint': 'http://kg.hiekn.com:28888/cbnode_ws/userreport/add/file?token=a68da3ec8c0a474cb91628992ff59522&userId=261'
                    }
                ]
            }
        ],
        isEditableFilePattern: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|.html|cfm|cgi|aspx?|ini|pl|py|md|css|cs|js|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst)$/i,
        isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
        isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i
    });

})(window, angular);

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

(function (window, angular,$) {
    'use strict';
    angular.module('fb.main').controller('MainController', MainController);

    MainController.$inject  = ['$scope','$translate', 'localStorageService', '$location', '$mdSidenav','appConstant','$mdMedia','$mdToast','$timeout','fileFactory','fileConstant','$filter','$mdPanel','$mdDialog'];

    function MainController($scope,$translate, localStorageService, $location, $mdSidenav,appConstant,$mdMedia,$mdToast,$timeout,fileFactory,fileConstant,$filter,$mdPanel,$mdDialog) {
        var ctrl = this;

        ctrl.store = null;
        if(localStorageService.isSupported) {
            ctrl.store = localStorageService;
        }else if(localStorageService.cookie.isSupported){
            ctrl.store = localStorageService.cookie;
        }
        ctrl.changeLanguage = function (locale) {
            if (!locale) {
                locale = ctrl.store.get('language') || appConstant.defaultLang;
            }
            ctrl.store.set('language', locale);
            $translate.use(locale);
        };
        ctrl.isGtSm = function(){
            return $mdMedia('gt-sm');
        };
        ctrl.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
        ctrl.changeLanguage($location.$$search.lang);
        ctrl.showSimpleToast = function (text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(3000)
            );
        };
        ctrl.setViewType = function (name) {
            if (!name) {
                name = ctrl.store.get('viewType') || appConstant.defaultViewType;
            }
            ctrl.store.set('viewType', name);
            ctrl.viewType = name;
        };
        ctrl.setViewType();

        ctrl.fileService = new fileFactory({
            pathSuffix:'/'
        });
        ctrl.fileService.fbInfo = {
            isOpen:true,
            hide:false,
            children:[],
            pathName:'/',
            level:0,
            path:'/',
            parent:null
        };

        ctrl.initNodes = [];
        ctrl.pathNodes = [];
        ctrl.selectNodes = [];
        ctrl.selectNode = ctrl.fileService;
        ctrl.resizeable = false;
        ctrl.nodeConfig = [
            {
                'name':'pathSuffix',
                'showName':'标题',
                'show':true,
                'width':250,
                'flex':50,
                'getData':function (item) {
                    return item.model.pathSuffix;
                }
            },
            {
                'name':'owner',
                'showName':'所有者',
                'show':true,
                'width':80,
                'flex':10,
                'getData':function (item) {
                    return item.model.owner;
                }
            },
            {
                'name':'length',
                'showName':'文件大小',
                'getData':function (item) {
                    return item.model.length;
                }
            },
            {
                'name':'sizeHuman',
                'show':true,
                'width':100,
                'showName':'文件大小',
                'flex':15,
                'getData':function (item) {
                    return item.model.type == 'DIRECTORY' ? 0 : item.model.sizeHuman();
                }
            },
            {
                'name':'modificationTime',
                'show':true,
                'width':150,
                'showName':'修改时间',
                'getData':function (item) {
                    return $filter('formatDate')(item.model.modificationTime);
                }
            },
            {
                'name':'accessTime',
                'showName':'访问次数',
                'getData':function (item) {
                    return item.model.accessTime;
                }
            },
            {
                'name':'blockSize',
                'showName':'块大小',
                'getData':function (item) {
                    return item.model.blockSize;
                }
            },
            {
                'name':'childrenNum',
                'showName':'子文件数',
                'getData':function (item) {
                    return item.model.childrenNum;
                }
            },
            {
                'name':'fileId',
                'showName':'文件ID',
                'getData':function (item) {
                    return item.model.fileId;
                }
            },
            {
                'name':'group',
                'showName':'组',
                'getData':function (item) {
                    return item.model.group;
                }
            },
            {
                'name':'permission',
                'showName':'权限',
                'getData':function (item) {
                    return item.model.permission;
                }
            },
            {
                'name':'replication',
                'showName':'折叠',
                'getData':function (item) {
                    return item.model.permission;
                }
            },
            {
                'name':'storagePolicy',
                'showName':'存储策略',
                'getData':function (item) {
                    return item.model.storagePolicy;
                }
            },
            {
                'name':'type',
                'showName':'类型',
                'getData':function (item) {
                    return item.model.type;
                }
            }
        ];

        ctrl.isTrueData = true;

        ctrl.loadNode = function (parent) {
            if(ctrl.isTrueData){
                return parent.list().then(function () {
                    return parent.fbInfo.children;
                },function () {
                    ctrl.showSimpleToast(parent.error);
                    return [];
                });
            }else{
                return ctrl.createList(parent);
            }
        };
        ctrl.treeNodeFilter = function (node) {
            return node.model.type == 'DIRECTORY';
        };
        ctrl.pathName = function (node) {
            return node.model.pathSuffix;
        };
        ctrl.createList = function (parent) {
            var nodes = [];
            var level = parent ? parent.fbInfo.level + 1 : 0;
            // for(var i = 0;i< 65535;i++){
            //     var type =  Math.round(Math.random());
            //     var pathSuffix = '文件'+ (type != 0 ?  '':'夹') + level + '-' + i;
            //     var item = new fileFactory({
            //         pathSuffix:pathSuffix,
            //         owner:'sofia' + i,
            //         size:i,
            //         modificationTime:new Date().getTime() + i * 1000,
            //         type:type == 0 ? 'DIRECTORY' : 'FILE'
            //     });
            //     nodes.push(item);
            // }
            // return nodes;
            var arrs = [];
            var perArr = 1000;
            var all = 65535;
            for(var k = 0;k< all;k++){
                var start = perArr * k;
                for(var j = start;j < start + perArr && j < all; j++){
                    arrs[k] ? arrs[k].push(j) : arrs[k] = [j];
                }
            }
            var d = null;
            for(var l = 0;l< arrs.length; l++){
                var t = $timeout(function () {
                    var arr = arrs.splice(0,1)[0];
                    var itemStart = (Math.floor(all / perArr) - arrs.length) * 1000;
                    for(var i = 0;i< arr.length;i++){
                        var type =  Math.round(Math.random());
                        var pathSuffix = '文件'+ (type != 0 ?  '':'夹') + level + '-' + (itemStart + i);
                        var item = new fileFactory({
                            pathSuffix:pathSuffix,
                            owner:'sofia' + (itemStart + i),
                            length:(itemStart + i),
                            modificationTime:new Date().getTime() + (itemStart + i) * 1000,
                            type:type == 0 ? 'DIRECTORY' : 'FILE'
                        });
                        nodes.push(item);
                    }
                    if(nodes.length == all){
                        return nodes;
                    }
                },0);
                if(l == arrs.length - 1){
                    d = t;
                }
            }
            return d;
        };
        ctrl.execNode = function (parent) {
            if(parent.isFolder()){
                return ctrl.loadNode(parent);
            }else if(parent.isEditable()){
                $mdDialog.show({
                    controllerAs: 'vm',
                    controller: ['$mdDialog', 'item',function ($mdDialog,item) {
                        var vm = this;
                        vm.item = item;
                        vm.item.open();
                        vm.inEdit = false;
                        vm.cancel = function () {
                            $mdDialog.cancel();
                        };

                        vm.edit = function (edit) {
                            vm.inEdit = edit;
                        };
                    }],
                    templateUrl: 'src/js/file/templates/dialog-text-preview.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    locals:{item:parent},
                    fullscreen: true
                });
            }else if(parent.isImage()){
                $mdDialog.show({
                    controllerAs: 'vm',
                    controller: ['$mdDialog', 'item', 'appConstant',function ($mdDialog,item,appConstant) {
                        var vm = this;
                        vm.item = item;
                        vm.domain = appConstant.restUrl + '/v1';

                        vm.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }],
                    templateUrl: 'src/js/file/templates/dialog-image-preview.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    locals:{item:parent},
                    fullscreen: true
                });
            }else{
                console.log(parent.model.pathSuffix);
            }
        };
        ctrl.getItemIcon = function (item) {
            return item.model.type != 'DIRECTORY' ? 'description':'folder';
        };
        ctrl.sortCompare = function (key,desc) {
            if(desc){
                return function(a,b){
                    return a.model[key] < b.model[key];
                };
            }else{
                return function(a,b){
                    return a.model[key] > b.model[key];
                };
            }
        };
        ctrl.searchNodeFilter = function (item,query) {
            return item.model.pathSuffix.indexOf(query) >= 0;
        };
        ctrl.changeDataType = function () {
            ctrl.loadNode(ctrl.fileService).then(function (nodes) {
                ctrl.initNodes = nodes;
            });
        };

        ctrl.changeDataType();

        ctrl.schemas = fileConstant.schemas;
        $scope.$watch(function () {
            return ctrl.selectNodes;
        }, function(newValue,oldValue){
            if(newValue){
                if(newValue != oldValue){
                    if(newValue.length == 1){
                        var node = ctrl.selectNodes[0];
                        var schema = {};
                        var form = [];
                        angular.forEach(ctrl.schemas,function (v) {
                            if(v.type == 0){
                                $.extend(true,schema,angular.copy(v.schema));
                                form = form.concat(angular.copy(v.form));
                            }
                        });
                        node.config = {
                            schema:schema,
                            form:form
                        };
                        node.xAttr = {};
                        angular.forEach(node.model.xAttrs,function (v) {
                           node.xAttr[v.name] = v.value;
                        });
                        node.xAttrEdit = false;
                        $mdSidenav('right').open();
                    }
                }
            }
        });
        ctrl.closeSidenav = function () {
            $mdSidenav('right').close();
        };
        ctrl.onSubmit = function () {
            var node = ctrl.selectNodes[0];
            var xAttrs = [];
            xAttrs.push({name:'schemas',value:node.xAttr.schemas});
            //TODO
            node.tempModel.xAttrs = xAttrs;
            node.model.xAttrs = node.tempModel.xAttrs;
            window.console.log(xAttrs);
        };
        ctrl.schemaExists = function (item) {
            var fileType = ctrl.selectNodes[0].xAttr && ctrl.selectNodes[0].xAttr.schemas ||  [];
            var ex = false;
            angular.forEach(fileType,function (v) {
               if(v == item.name){
                   ex = true;
               }
            });
            return ex;
        };
        ctrl.schemaToggle = function (item) {
            var fileType = ctrl.selectNodes[0].xAttr && ctrl.selectNodes[0].xAttr.schemas ||  [];
            var ex = false;
            angular.forEach(fileType,function (v,i) {
               if(v == item.name){
                   ctrl.selectNodes[0].xAttr.schemas.splice(i,1);
                   ex = true;
               }
            });
            if(!ex){
                fileType.push(item.name);
                ctrl.selectNodes[0].xAttr.schemas = fileType;
            }
            var schema = {};
            var form = [];
            angular.forEach(ctrl.schemas,function (v) {
                if(v.type == 0){
                    $.extend(true,schema,angular.copy(v.schema));
                    form = form.concat(angular.copy(v.form));
                }
                angular.forEach(fileType,function (vv) {
                    if(vv == v.name){
                        $.extend(true,schema,angular.copy(v.schema));
                        form = form.concat(angular.copy(v.form));
                    }
                });
            });
            ctrl.selectNodes[0].config = {
                schema:schema,
                form:form
            };
        };

        ctrl.rightClickList = function (ev,clickItem,parent,selectNodes) {
            ctrl.rightClickItem(ev,clickItem,parent,selectNodes,'src/js/file/templates/file-right-click-list.html');
        };

        ctrl.rightClickTree = function (ev,clickItem,selectNode) {
            ctrl.rightClickItem(ev,clickItem,selectNode,[],'src/js/file/templates/file-right-click-tree.html');
        };

        ctrl.rightClickItem = function (ev,clickItem,item,selectNodes,templateUrl) {
            var position = $mdPanel.newPanelPosition().absolute()
                .top(ev.clientY + 'px')
                .left(ev.clientX + 'px');
            var animation = $mdPanel.newPanelAnimation();
            animation.openFrom({top:ev.clientY + 'px', left:ev.clientX + 'px'});
            animation.closeTo({top:ev.clientY + 'px', left:ev.clientX + 'px'});
            animation.withAnimation({
                open: 'right-click-animation-open',
                close: 'right-click-animation-close'
            });
            var panelConfig = {
                animation: animation,
                attachTo: angular.element(document.body),
                controllerAs: 'vm',
                controller: ['mdPanelRef', 'selectNodes', 'item','clickItem','fileFactory','$mdDialog', function (mdPanelRef, selectNodes, item,clickItem,fileFactory,$mdDialog) {
                    var vm = this;
                    vm.items = selectNodes;
                    vm.item = item;
                    vm.clickItem = clickItem;
                    vm.cancel = function () {
                        mdPanelRef.close();
                    };
                    vm.open = function () {
                        mdPanelRef.close();
                    };
                    vm.delete = function(ev) {
                        var html = '<ul>';
                        if(vm.items.length){
                            angular.forEach(vm.items,function (v,i) {
                                if(i < 5){
                                    html += '<li>' + v.model.pathSuffix + '</li>';
                                }else if(i == 5){
                                    html += '<li>...共'+vm.items.length+'项</li>';
                                }
                            });
                        }else if(vm.clickItem){
                            html += '<li>' + vm.clickItem.model.pathSuffix + '</li>';
                        }
                        html += '</ul>';
                        var confirm = $mdDialog.confirm()
                            .title('删除确认')
                            .htmlContent(html)
                            .ariaLabel('删除确认')
                            .targetEvent(ev)
                            .ok('删除')
                            .cancel('取消');

                        $mdDialog.show(confirm).then(function() {
                            vm.deleteNode();
                        });
                        mdPanelRef.close();
                    };
                    vm.create = function(ev) {
                        var create = $mdDialog.prompt()
                            .title('新建文件夹')
                            .placeholder('名称')
                            .ariaLabel('请输入文件夹名称')
                            .initialValue('New Folder')
                            .targetEvent(ev)
                            .ok('创建')
                            .cancel('取消');
                        $mdDialog.show(create).then(function(result) {
                            vm.createNode(result,vm.clickItem,vm.item);
                        });
                    };
                    vm.rename = function(ev) {
                        var name = '';
                        if(vm.clickItem){
                            name = vm.clickItem.tempModel.pathSuffix;
                        }else if(vm.items.length){
                            name = vm.items[0].tempModel.pathSuffix;
                        }
                        var rename = $mdDialog.prompt()
                            .title('重命名文件/文件夹')
                            .placeholder('名称')
                            .ariaLabel('请输入名称')
                            .initialValue(name)
                            .targetEvent(ev)
                            .ok('重命名')
                            .cancel('取消');
                        $mdDialog.show(rename).then(function(result) {
                            if(vm.clickItem){
                                vm.renameNode(result,vm.clickItem);
                            }else if(vm.items.length){
                                angular.forEach(vm.items,function (v,i) {
                                    vm.renameNode(result + (i > 0 ? '('+ i + ')':''),v);
                                });
                            }
                        });
                        mdPanelRef.close();
                    };
                    vm.renameNode = function (path,item) {
                        item.rename(path).then(function () {
                            var parentPath = item.fbInfo.path.substring(0,item.fbInfo.path.lastIndexOf('/'));
                            item.fbInfo.pathName = item.model.pathSuffix = item.tempModel.pathSuffix = path;
                            item.fbInfo.path = parentPath + '/' + path;
                            ctrl.updateTree = true;
                        },function (data) {
                            vm.tipInfo(data);
                        });
                    };
                    vm.createNode = function (path,item) {
                        item.mkdir(path).then(function () {
                            if(item.fbInfo.children.length || (item.fbInfo.isOpen && !item.fbInfo.children.length)){
                                var file = new fileFactory({
                                    pathSuffix:path
                                });
                                file.fbInfo = {
                                    isOpen:false,
                                    hide:!item.fbInfo.isOpen,
                                    children:[],
                                    pathName:path,
                                    level:item.fbInfo.level + 1,
                                    path:item.fbInfo.path + '/' + path,
                                    parent:item
                                };
                                file.get().then(function () {
                                    file.model.pathSuffix = file.tempModel.pathSuffix = path;
                                    item.fbInfo.children.push(file);
                                    ctrl.updateTree = true;
                                });
                            }
                        },function (data) {
                            vm.tipInfo(data);
                        });
                    };
                    vm.deleteNode = function () {
                        if(vm.items.length){
                            angular.forEach(vm.items,function (v) {
                                vm.removeNodes(v);
                            });
                        }else if(vm.clickItem){
                            vm.removeNodes(vm.clickItem);
                        }
                        mdPanelRef.close();
                    };
                    vm.removeNodes = function (item) {
                        item.delete().then(function () {
                            var parent = item.fbInfo.parent;
                            angular.forEach(parent.fbInfo.children,function (v,i) {
                                if(v.fbInfo.path == item.fbInfo.path){
                                    parent.fbInfo.children.splice(i,1);
                                }
                            });
                            if(vm.item && vm.item.fbInfo.path == item.fbInfo.path){
                                ctrl.selectNode = parent;
                            }
                            ctrl.updateTree = true;
                        },function (data) {
                            vm.tipInfo(data);
                        });
                    };
                    vm.open = function () {

                    };
                    vm.tipInfo = function (data) {
                        if(data.status == 403){
                            ctrl.showSimpleToast('您没有权限在此目录操作');
                        }else{
                            ctrl.showSimpleToast(data.status + ':' + data.statusText);
                        }
                    };
                }],
                templateUrl: templateUrl,
                panelClass: 'right-click-panel',
                position: position,
                locals: {selectNodes: selectNodes,item: item,clickItem:clickItem},
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: false
            };
            $mdPanel.open(panelConfig);
            ev.stopPropagation();
        };

        /**
         * TODO: update areaSelect to fit angular
         * */
        // setTimeout(function () {
        //     $('#content').find('md-virtual-repeat-container').areaSelect({
        //         sisClass:"fb-list-item",onClass:"fb-list-item-select",shiftKey:false,onRightClick:function(event,objs){
        //             console.log(objs.length);
        //         },onItemSelectedChange:function(objs){
        //             console.log(objs.length);
        //         }
        //     });
        // },1000);
    }
})(window, angular,jQuery);



angular.module("fb").run(["$templateCache", function($templateCache) {$templateCache.put("src/js/directives/templates/fb-attr.html","<div class=\"fb-attr\">\r\n    <form sf-schema=\"fbSchema\" sf-form=\"fbForm\" sf-model=\"fbModel\" name=\"fbSchemaForm\" layout=\"column\" ng-submit=\"onSubmit(fbSchemaForm)\"></form>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-list-title-right-click.html","<div class=\"fb-right-click\" role=\"listbox\">\r\n    <div class=\"menu-item\"\r\n         ng-click=\"item.show = !item.show\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-repeat=\"item in vm.items\">\r\n        <md-checkbox ng-checked=\"item.show\" class=\"md-primary\">\r\n            {{ item.showName }}\r\n        </md-checkbox>\r\n    </div>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-list.html","<div class=\"fb-list\" layout=\"column\" flex>\r\n    <div layout=\"row\" layout-align=\"space-between center\" class=\"fb-list-toolbar\" md-whiteframe=\"1\">\r\n        <div class=\"fb-list-nav\" flex layout=\"row\" layout-align=\"start center\" ng-show=\"!inEditPath\">\r\n            <div layout=\"row\" layout-align=\"start center\" flex=\"nogrow\">\r\n                <md-button ng-click=\"loadPath()\">根目录</md-button>\r\n                <div layout=\"row\" layout-align=\"start center\" ng-repeat=\"item in fbPathNodes\" class=\"fb-list-nav-item\">\r\n                    <md-icon>keyboard_arrow_right</md-icon>\r\n                    <md-button ng-click=\"loadPath(item)\" ng-if=\"!$last\">{{item.fbInfo.pathName}}</md-button>\r\n                    <span ng-if=\"$last\">{{item.fbInfo.pathName}}</span>\r\n                </div>\r\n            </div>\r\n            <md-button class=\"md-icon-button\" ng-click=\"editPath()\"><md-icon>edit</md-icon></md-button>\r\n        </div>\r\n        <div class=\"fb-list-nav\" flex layout=\"row\" layout-align=\"start center\" ng-show=\"inEditPath\">\r\n            <md-input-container md-no-float class=\"md-block\" flex>\r\n                <md-icon>edit</md-icon>\r\n                <input id=\"path-editor\" type=\"text\" ng-model=\"nowPath\" placeholder=\"请输入要打开的目录\" ng-keyup=\"goPath($event)\" ng-blur=\"leaveEditPath()\" onfocus=\"this.select()\">\r\n            </md-input-container>\r\n        </div>\r\n        <div flex=\"none\" layout=\"row\" layout-align=\"end center\" class=\"fb-list-search\" ng-show=\"fbSearchNodeFilter\">\r\n            <md-input-container md-no-float>\r\n                <md-icon>search</md-icon>\r\n                <input ng-model=\"searchText\" type=\"text\" placeholder=\"本地搜索\" ng-keyup=\"searchNode($event)\">\r\n            </md-input-container>\r\n        </div>\r\n    </div>\r\n    <div flex layout=\"column\" ng-if=\"fbView == \'list\'\">\r\n        <div id=\"fb-list-item-title\">\r\n            <div class=\"fb-list-item-title\" layout=\"row\" layout-align=\"start center\" ng-right-click=\"rightClickTitle($event)\"\r\n                as-sortable=\"dragControlListeners\" ng-model=\"fbNodeConfig\">\r\n                <div ng-click=\"sort(item.name)\" md-ink-ripple layout=\"row\" ng-repeat=\"item in fbNodeConfig\" ng-if=\"item.show && !fbResizeable\"\r\n                     ng-class=\"{\'layout-align-end-center\':isLastTitle(item)}\" as-sortable-item flex=\"{{item.flex}}\">\r\n                    <div as-sortable-item-handle></div>\r\n                    <span flex=\"nogrow\">{{item.showName}}</span>\r\n                    <md-icon ng-if=\"sortItem == item.name\">{{sortBy == \'asc\' ? \'arrow_upward\':\'arrow_downward\'}}</md-icon>\r\n                </div>\r\n                <div ng-click=\"sort(item.name)\" md-ink-ripple layout=\"row\" ng-repeat=\"item in fbNodeConfig\" ng-if=\"item.show && fbResizeable\"\r\n                     as-sortable-item resizable r-directions=\"[\'right\']\" r-width=\"item.width || 100\">\r\n                    <div as-sortable-item-handle></div>\r\n                    <span flex=\"nogrow\">{{item.showName}}</span>\r\n                    <md-icon ng-if=\"sortItem == item.name\">{{sortBy == \'asc\' ? \'arrow_upward\':\'arrow_downward\'}}</md-icon>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <md-virtual-repeat-container fb-area-select ng-model=\"allNode\" class=\"fb-list-list-container\" md-top-index=\"topIndex\" flex ng-right-click=\"rightClickItem(null,$event)\" ng-click=\"clickEmpty($event)\">\r\n            <div md-virtual-repeat=\"item in allNode\" md-item-size=\"20\">\r\n                <div class=\"fb-list-item\" ng-right-click=\"rightClickItem(item,$event,$index)\"\r\n                     ng-class=\"{\'fb-list-item-select\':isSelectedNode(item),\'fb-list-item-last-select\':$index == fbLastSelectNodesIndex}\"\r\n                     ng-click=\"click(item,$event,$index)\" ng-dblclick=\"getChildren(item)\" md-ink-ripple>\r\n                    <div layout=\"row\" layout-align=\"start center\" class=\"fb-list-item-inner\">\r\n                        <div style=\"text-align: left;\" ng-style=\"{\'width\':it.width || 100}\" ng-repeat=\"it in fbNodeConfig\" ng-if=\"it.show && fbResizeable\">\r\n                            <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\" ng-if=\"isFirstField(it)\">{{getItemStatus(item)}}</md-icon>\r\n                            {{it.getData(item)}}\r\n                        </div>\r\n                        <div flex=\"{{it.flex}}\" ng-repeat=\"it in fbNodeConfig\" ng-if=\"it.show && !fbResizeable\">\r\n                            <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\" ng-if=\"isFirstField(it)\">{{getItemStatus(item)}}</md-icon>\r\n                            {{it.getData(item)}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </md-virtual-repeat-container>\r\n    </div>\r\n    <div flex layout=\"column\" ng-if=\"fbView == \'grid\'\">\r\n        <md-virtual-repeat-container class=\"fb-list-grid-container\"  md-top-index=\"topIndex\" flex ng-right-click=\"rightClickItem(null,$event)\" ng-click=\"clickEmpty($event)\">\r\n            <div md-virtual-repeat=\"item0 in allGridNode\" md-item-size=\"20\" layout=\"row\" layout-align=\"start start\">\r\n                <div ng-repeat=\"item in item0\" class=\"fb-list-item\" ng-right-click=\"rightClickItem(item,$event,$index)\"\r\n                     ng-class=\"{\'fb-list-item-select\':isSelectedNode(item),\'fb-list-item-select-multi\':fbSelectNodes.length > 1,\'fb-list-item-last-select\':isLastClickNode(item)}\" layout=\"column\"\r\n                     ng-include=\"fbListItemGridTemplateUrl\"\r\n                     ng-click=\"click(item,$event)\" ng-dblclick=\"getChildren(item)\" md-ink-ripple>\r\n                </div>\r\n            </div>\r\n        </md-virtual-repeat-container>\r\n    </div>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-tree.html","<div flex layout=\"column\" class=\"fb-tree\">\r\n    <md-virtual-repeat-container  md-top-index=\"topIndex\" flex>\r\n        <div class=\"fb-tree-item\" ng-class=\"{\'fb-tree-item-select\':item.fbInfo.path == fbSelectNode.path}\" md-virtual-repeat=\"item in allShowNode\"\r\n             md-item-size=\"20\" layout=\"row\" ng-click=\"listNode(item)\" ng-dblclick=\"toggleNode(item,$event)\" ng-right-click=\"rightClickItem(item,$event)\">\r\n            <md-button class=\"md-icon-button\" ng-click=\"toggleNode(item,$event)\" ng-style=\"{\'margin-left\': (item.fbInfo.level * 24 ) + \'px\'}\">\r\n                <md-icon>{{item.fbInfo.isOpen ? \'keyboard_arrow_down\':\'keyboard_arrow_right\'}}</md-icon>\r\n            </md-button>\r\n            <md-button class=\"md-fat\">\r\n                <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\">{{getItemStatus(item)}}</md-icon>\r\n                <span ng-include=\"fbTreeItemTemplateUrl\"></span>\r\n            </md-button>\r\n        </div>\r\n    </md-virtual-repeat-container>\r\n</div>");
$templateCache.put("src/js/file/templates/dialog-image-preview.html","<md-dialog aria-label=\"Image Preview\" class=\"fb-file\">\r\n    <form ng-cloak>\r\n        <md-toolbar>\r\n            <div class=\"md-toolbar-tools\">\r\n                <h2>图片预览</h2>\r\n                <span flex></span>\r\n                <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\r\n                    <md-icon aria-label=\"Close dialog\">close</md-icon>\r\n                </md-button>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-dialog-content>\r\n            <div class=\"md-dialog-content\">\r\n                <img ng-src=\"{{vm.domain + vm.item.fbInfo.path + \'?op=open\'}}\"/>\r\n            </div>\r\n        </md-dialog-content>\r\n    </form>\r\n</md-dialog>");
$templateCache.put("src/js/file/templates/dialog-text-preview.html","<md-dialog aria-label=\"Text File Preview\" flex=\"80\" flex-gt-lg=\"50\" class=\"fb-file\">\r\n    <form ng-cloak>\r\n        <md-toolbar>\r\n            <div class=\"md-toolbar-tools\">\r\n                <h2>{{vm.item.model.pathSuffix}}</h2>\r\n                <span flex></span>\r\n                <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\r\n                    <md-icon aria-label=\"Close dialog\">close</md-icon>\r\n                </md-button>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-dialog-content>\r\n            <div class=\"md-dialog-content\">\r\n                <div ng-if=\"!vm.inEdit\" class=\"fb-file-content\">\r\n                    {{vm.item.model.content}}\r\n                </div>\r\n                <div ng-if=\"vm.inEdit\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                        <textarea ng-model=\"vm.item.tempModel.content\" rows=\"15\" md-select-on-focus placeholder=\"请输入\"></textarea>\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n        </md-dialog-content>\r\n        <md-dialog-actions layout=\"row\">\r\n            <span flex></span>\r\n            <md-button class=\"md-primary\" ng-click=\"vm.edit(true)\" ng-show=\"!vm.inEdit\">\r\n                编辑\r\n            </md-button>\r\n            <md-button ng-click=\"vm.edit(false)\" ng-show=\"vm.inEdit\">\r\n                取消\r\n            </md-button>\r\n            <md-button class=\"md-primary\" ng-click=\"vm.save()\" ng-show=\"vm.inEdit\">\r\n                保存\r\n            </md-button>\r\n        </md-dialog-actions>\r\n    </form>\r\n</md-dialog>");
$templateCache.put("src/js/file/templates/file-list-grid.html","<md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\">{{getItemStatus(item)}}</md-icon>\r\n<div class=\"fb-list-item-title-container\">{{item.model.pathSuffix}}</div>");
$templateCache.put("src/js/file/templates/file-list-right.html","<md-content flex layout=\"column\">\r\n    <div layout=\"row\" layout-align=\"space-between center\">\r\n        <div layout-padding>\r\n            项目属性\r\n        </div>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.closeSidenav()\">\r\n            <md-icon>close</md-icon>\r\n        </md-button>\r\n    </div>\r\n    <md-divider></md-divider>\r\n    <div layout=\"column\" flex>\r\n        <div ng-if=\"vm.selectNodes.length > 1\">\r\n            已选中{{vm.selectNodes.length}}个项目\r\n        </div>\r\n        <div ng-if=\"vm.selectNodes.length == 1 && !vm.selectNodes[0].xAttrEdit\">\r\n            <md-button ng-click=\"vm.selectNodes[0].xAttrEdit = true\">编辑</md-button>\r\n            {{vm.selectNodes[0].model.xAttrs}}\r\n        </div>\r\n        <div ng-if=\"vm.selectNodes.length == 1 && vm.selectNodes[0].xAttrEdit\" layout=\"column\" flex>\r\n            <div layout=\"row\" layout-padding flex=\"none\">\r\n                <span>文件类型：</span>\r\n                <div ng-repeat=\"item in vm.schemas\">\r\n                    <md-checkbox ng-checked=\"vm.schemaExists(item)\" ng-click=\"vm.schemaToggle(item)\" class=\"md-primary\" ng-if=\"item.type != 0\">\r\n                        {{ item.showName }}\r\n                    </md-checkbox>\r\n                </div>\r\n            </div>\r\n            <div flex layout-padding class=\"overflow-auto\">\r\n                <fb-attr fb-model=\"vm.selectNodes[0].xAttr\" ng-model=\"vm.selectNodes[0].config\"></fb-attr>\r\n            </div>\r\n            <md-divider></md-divider>\r\n            <div flex=\"none\" layout=\"row\" layout-align=\"end center\">\r\n                <md-button class=\"md-primary\" ng-click=\"vm.onSubmit()\">保存</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</md-content>");
$templateCache.put("src/js/file/templates/file-right-click-list.html","<div class=\"fb-right-click\" role=\"listbox\">\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'open\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.open()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'open\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length == 1\">\r\n        <md-icon>drafts</md-icon>\r\n        打开\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'delete\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.delete($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'delete\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>delete</md-icon>\r\n        删除\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'rename\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.rename()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'rename\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>border_color</md-icon>\r\n        重命名\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'download\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.download()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'download\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>cloud_download</md-icon>\r\n        下载文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'cut\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.cut()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'cut\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>content_cut</md-icon>\r\n        剪切\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'copy\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.copy()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'copy\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>add_to_photos</md-icon>\r\n        复制\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'paste\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.paste()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'paste\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.copyItems\">\r\n        <md-icon>layers</md-icon>\r\n        粘贴\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'compress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.compress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'compress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>archive</md-icon>\r\n        压缩\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'uncompress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.uncompress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'uncompress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>unarchive</md-icon>\r\n        解压\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'show\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.show()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'show\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>flip_to_front</md-icon>\r\n        显示文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'hide\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.hide()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'hide\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>flip_to_back</md-icon>\r\n        隐藏文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'share\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.share()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'share\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length == 1\">\r\n        <md-icon>share</md-icon>\r\n        共享\r\n    </div>\r\n    <md-divider ng-if=\"vm.items.length\"></md-divider>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.create($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>create_new_folder</md-icon>\r\n        新建文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.createFile($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>description</md-icon>\r\n        新建文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'upload\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.upload()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'upload\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>cloud_upload</md-icon>\r\n        上传文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'attr\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.attr()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'attr\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>featured_play_list</md-icon>\r\n        属性\r\n    </div>\r\n</div>");
$templateCache.put("src/js/file/templates/file-right-click-tree.html","<div class=\"fb-right-click\" role=\"listbox\" ng-if=\"vm.clickItem\">\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'open\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.open()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'open\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>drafts</md-icon>\r\n        打开\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'delete\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.delete($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'delete\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>delete</md-icon>\r\n        删除\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'rename\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.rename()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'rename\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>border_color</md-icon>\r\n        重命名\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'cut\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.cut()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'cut\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>content_cut</md-icon>\r\n        剪切\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'copy\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.copy()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'copy\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>add_to_photos</md-icon>\r\n        复制\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'paste\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.paste()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'paste\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.copyItems\">\r\n        <md-icon>layers</md-icon>\r\n        粘贴\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'compress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.compress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'compress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>archive</md-icon>\r\n        压缩\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'hide\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.hide()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'hide\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>flip_to_back</md-icon>\r\n        隐藏文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'share\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.share()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'share\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>share</md-icon>\r\n        共享\r\n    </div>\r\n    <md-divider ng-if=\"vm.items.length\"></md-divider>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.create($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>create_new_folder</md-icon>\r\n        新建文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'upload\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.upload()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'upload\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>cloud_upload</md-icon>\r\n        上传文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'attr\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.attr()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'attr\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>featured_play_list</md-icon>\r\n        属性\r\n    </div>\r\n</div>");
$templateCache.put("src/js/file/templates/file-tree.html","{{item.model.pathSuffix}}");
$templateCache.put("src/js/main/templates/main-sidenav.html","<fb-tree ng-model=\"vm.initNodes\" fb-load=\"vm.loadNode\" fb-select-node=\"vm.selectNode\"\r\n         fb-path-nodes=\"vm.pathNodes\" fb-filter=\"vm.treeNodeFilter\" fb-path-name=\"vm.pathName\"\r\n         fb-item-icon=\"\'folder\'\"\r\n         fb-right-click=\"vm.rightClickTree\"\r\n         fb-update=\"vm.updateTree\"\r\n         fb-tree-item-template-url=\"\'src/js/file/templates/file-tree.html\'\">\r\n</fb-tree>");
$templateCache.put("src/js/main/templates/main-topbar.html","<md-toolbar flex>\r\n    <div class=\"md-toolbar-tools\" layout=\"row\">\r\n        <div layout=\"row\" layout-align=\"start center\" flex=\"none\" class=\"nav-logo\">\r\n            <a ui-sref=\"main\"><img src=\"images/logo.png\" height=\"48\"></a>\r\n        </div>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.toggleSidenav(\'left\')\" hide-gt-sm aria-label=\"Toggle Menu\">\r\n            <md-tooltip>{{\'change_sidenav\' | translate}}</md-tooltip>\r\n            <md-icon>menu</md-icon>\r\n        </md-button>\r\n        <span flex></span>\r\n\r\n        <md-switch class=\"md-primary\" ng-model=\"vm.resizeable\" aria-label=\"List Resizeable\">\r\n            <md-tooltip>{{\'list_resizeable\' | translate}}</md-tooltip>\r\n        </md-switch>\r\n\r\n        <md-switch class=\"md-primary\" ng-model=\"vm.isTrueData\" aria-label=\"NOT DEBUG\" ng-change=\"vm.changeDataType()\">\r\n            <md-tooltip>{{\'not_debug_mode\' | translate}}</md-tooltip>\r\n        </md-switch>\r\n\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.setViewType(\'list\')\" aria-label=\"List\" ng-if=\"vm.viewType == \'grid\'\">\r\n            <md-tooltip>{{\'list_view\' | translate}}</md-tooltip>\r\n            <md-icon>view_list</md-icon>\r\n        </md-button>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.setViewType(\'grid\')\" aria-label=\"Grid\" ng-if=\"vm.viewType == \'list\'\">\r\n            <md-tooltip>{{\'grid_view\' | translate}}</md-tooltip>\r\n            <md-icon>apps</md-icon>\r\n        </md-button>\r\n\r\n        <md-menu md-position-mode=\"target-right target\" >\r\n            <md-button class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\" aria-label=\"Change Language\">\r\n                <md-tooltip>{{\'change_language\' | translate}}</md-tooltip>\r\n                <md-icon>language</md-icon>\r\n            </md-button>\r\n            <md-menu-content width=\"4\" >\r\n                <md-menu-item>\r\n                    <md-button ng-click=\"vm.changeLanguage(\'zh_cn\')\">\r\n                            切换为中文\r\n                    </md-button>\r\n                </md-menu-item>\r\n                <md-menu-item>\r\n                    <md-button ng-click=\"vm.changeLanguage(\'en\')\">\r\n                            Change To English\r\n                    </md-button>\r\n                </md-menu-item>\r\n            </md-menu-content>\r\n        </md-menu>\r\n    </div>\r\n</md-toolbar>");
$templateCache.put("src/js/main/templates/main.html","<div layout=\"column\" flex class=\"overflow-auto fb-main\" ng-controller=\"MainController as vm\">\r\n    <div layout=\"row\" flex=\"none\" class=\"top-bar\" ng-include=\"\'src/js/main/templates/main-topbar.html\'\" md-whiteframe=\"4\" layout-align=\"center stretch\"></div>\r\n    <div layout=\"row\" flex style=\"position: relative;\">\r\n        <md-sidenav ng-include=\"\'src/js/main/templates/main-sidenav.html\'\" layout=\"column\" class=\"md-sidenav-left md-whiteframe-4dp\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"></md-sidenav>\r\n        <md-content layout=\"column\" id=\"content\" flex>\r\n            <fb-list ng-model=\"vm.initNodes\" fb-click=\"vm.execNode\" fb-select-node=\"vm.selectNode\" fb-path-nodes=\"vm.pathNodes\" fb-select-nodes=\"vm.selectNodes\" fb-view=\"vm.viewType\"\r\n                     fb-path-name=\"vm.pathName\" fb-item-icon=\"vm.getItemIcon\" fb-sort-compare=\"vm.sortCompare\" fb-search-node-filter=\"vm.searchNodeFilter\" fb-node-config=\"vm.nodeConfig\"\r\n                     fb-list-item-grid-template-url=\"\'src/js/file/templates/file-list-grid.html\'\"\r\n                     fb-right-click=\"vm.rightClickList\"\r\n                     fb-resizeable=\"vm.resizeable\">\r\n            </fb-list>\r\n        </md-content>\r\n        <md-sidenav ng-include=\"\'src/js/file/templates/file-list-right.html\'\" layout=\"column\" class=\"md-sidenav-right md-whiteframe-4dp\" ng-class=\"{\'md-sidenav-expend\':vm.selectNodes[0].xAttrEdit}\" md-component-id=\"right\" md-disable-backdrop></md-sidenav>\r\n    </div>\r\n</div>");}]);