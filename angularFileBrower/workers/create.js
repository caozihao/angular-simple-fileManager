
onmessage = function (evt){
    var scope = evt.data;
    var parent = scope.parent;
    var fileFactory = scope.fileFactory;
    var result = '';
    var nodes = [];
    var level = parent ? parent.fbInfo.level + 1 : 0;
    var parentPath = parent ? parent.fbInfo.path : '';
    for(var i = 0;i< 65535;i++){
        var type =  Math.round(Math.random());
        var isFile = type == 0 ? false : true;
        var title = '文件'+ (isFile ?  '':'夹') + level + '-' + i;
        var path = parentPath + '/' + title;
        var item = new fileFactory({
            title:title,
            owner:'sofia' + i,
            size:i,
            accessTime:new Date().getTime() + i * 1000,
            type:type
        });
        item.fbInfo = {
            children:[],
            isFile : isFile,
            isOpen:false,
            level:level,
            path : path,
            searchKey:[]
        };
        nodes.push(item);
    }
    postMessage( nodes );
};