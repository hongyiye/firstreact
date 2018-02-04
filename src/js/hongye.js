 
var hongye = {};
var r20 = /%20/g;
var class2type = {},
core_toString = class2type.toString;

hongye.config = {};//存放一些插件的配置参数
//hongye.config.baseUrl = 'http://localhost:9080/hongyiye/';//请求发送的基础地址
hongye.config.baseUrl = 'http://39.108.232.134:8080/hongyiye/';//阿里云服务器
hongye.config.services = {};//存一些服务的地址baseUrl + services.service 就是具体的请求地址
hongye.cache = {};//存放一些缓存数据

hongye.ajax = function(){//封装ajax请求
    
}
//ajax的post方式提交
hongye.basepost = function(service,param,callback){
    if(typeof param == 'function'){
        callback = param;
        param = {};
    }
    hongye.post(hongye.config.baseUrl+service,param,callback);
}
hongye.post = function(url,param,callback){
    var xmlhttp = new XMLHttpRequest();
    url = url + "?t=" + Math.random();
    //绑定回调函数
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(typeof callback == 'function'){
                callback(xmlhttp.responseText);
            }
        }    
    };
    xmlhttp.withCredentials = true;//d支持跨域携带cookies
    xmlhttp.open('post',url,true);
    xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //这里转化param里的参数，发送到后台
    xmlhttp.send(hongye.param(param));
}
//把参数转化成post请求所需要的格式
hongye.param = function(param){
    var prefix,
        s = [],
        add = function(key,value){
            //如果这个value是一个function,则把这个function的返回值当做参数
            value = hongye.isFunction(value) ? value() : (value == null ? '' : value);
            s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };
    if(hongye.isArray(param)){
        var i = 0;
        var length = param.length;
        for(; i<length; i++){
            add(i,param[i]);
        }
    }else if(hongye.isObject(param)){
        Object.keys(param).forEach(function(key){
            add(key,param[key]);
        });
    }
    //encodeURIComponent已经把请求中的+转换成了2B%,这里把空格统一转换成+
    return s.join('&').replace(r20,'+');
}
//ajax的get方式提交
hongye.get = function(){

}


//Util工具方法模块
/**
 * 把对象obj2里的属性复制到obj1里，有重复的属性覆盖之
 */
hongye.extend = function(obj1,obj2){
    var src,copy;
    obj1 = obj1 || {};
    if(typeof obj1 != 'object'){
        obj1 = {};
    }
    
    for(name in obj2){
        src = obj1[name];
        copy = obj2[name];
        if(copy){
            obj1[name] = copy; 
        }
    }
    return obj1;
}
/**
 * 遍历一个数组或对象
 * obj需要遍历的数组或对象
 * callback回调函数
 */
hongye.each = function(obj,callback){
    var value,
        i = 0,
        length = obj.length,
        isArray = hongye.isFunction(obj);//判断是不是数组
        if(isArray){
            for(; i<length; i++){
                value = callback.call(obj[i],i,obj[i]);
                // if(value === false){
                //    break;
                // }
            }
        }else{
            Object.keys(obj).forEach(function(key){
                value = callback.call(obj[key],key,obj[key]);
                //if(value === false){
                    //   return;
                //}
            });
        }
}
hongye.isFunction = function(obj){
    return hongye.type(obj) === "function";
}
hongye.isArray = Array.isArray || function(obj){
    return hongye.type(obj) === "array";
}
hongye.isObject = function(obj){
    return hongye.type(obj) === "object";
}
hongye.type = function(obj){
    if(obj == null){//比如传入undefiend String(undefiend) = 'undefiend'
        return String(obj);
    }
    return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[core_toString.call(obj)] || 'object' : typeof obj;
}
//这里执行一些初始化方法
hongye.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});
//塞入一些初始化参数
hongye.config.services.articleListService = 'server.vue.query.view.blog.ArticleListService.service';

export {hongye};

