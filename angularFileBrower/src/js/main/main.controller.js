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


