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