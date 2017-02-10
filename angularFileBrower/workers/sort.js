 
onmessage = function (evt){
    var scope = evt.data;
    var startTime = new Date().getTime();
    var sortItem = function (key,desc) {
        if(desc){
            return function(a,b){
                return a[key] < b[key];
            };
        }else{
            return function(a,b){
                return a[key] > b[key];
            };
        }
    };
    var insertSort = function (array,fn) {
        for(var i = 1;i < array.length;i++){
            var key = array[i];
            var j = i - 1;
            while(j >= 0 && fn(array[j],key)){
                array[j+1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    };
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
    var fn = sortItem(scope.sortItem,scope.sortBy == 'desc');
    // insertSort(scope.allNode,fn);
    scope.allNode = mergeSort(scope.allNode,fn);
    postMessage( scope.allNode );
};