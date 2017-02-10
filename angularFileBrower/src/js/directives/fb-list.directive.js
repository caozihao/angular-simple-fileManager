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