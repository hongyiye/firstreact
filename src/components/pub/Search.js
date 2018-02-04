//公共组件，搜索页面
import React from 'react';

//定义一些组件内的私有的方法
function getSearchHistory(){
    //window.localStorage.setItem("searchHistory","紫罗兰永恒花园|魔卡少女樱");
    var searchHistory = (window.localStorage.getItem('searchHistory') || '').split('|') || [];
    if(searchHistory.length == 1 && searchHistory[0] == ''){
        searchHistory = [];
    }
    this.setState({searchHistory: searchHistory});
}
//把搜索关键字放入到历史里
function setSearchHistory(searchWords){
    var storage = window.localStorage;
    //这里还需要判断下，把重复的去掉。---把数组长度限制为6
    searchWords =  searchWords + (storage.getItem('searchHistory')?'|'+storage.getItem('searchHistory'):'');
    console.log("searchWords:" + searchWords);
    storage.setItem('searchHistory',searchWords);
    getSearchHistory.call(this);
}
//按回车搜索事件
function search(event){
    if(event.keyCode == 13){//如果按下了回车键
        var searchWords = event.target.value;
        console.log("searchWords:" + searchWords);
        //先把查询的关键字塞入到历史搜索里面
        if(searchWords.trim()){
            setSearchHistory.call(this,searchWords);
        }
    }
    event.stopPropagation();
}
//清除历史记录
function clearHistory(event){
    window.localStorage.setItem('searchHistory','');
    getSearchHistory.call(this);
    event.stopPropagation();
 }

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType: 1,//记录搜索类型，漫画，小说，帖子等
            searchHistory:[]
        };
    }

    _getHistoryItems(){
        var i = 0;
        var item;
        var res = [];
        const items = this.state.searchHistory;
        for(; i<items.length; i++){
            item = items[i];
            res.push(
                <div className="search-history-item" key={i}>
                    <img className="search-history-item-img" src="./static/images/system/history.png"/>
                    <span>{item}</span>
                </div>
            );
        }
        return res;
    }

    componentDidMount(){
        getSearchHistory.call(this);
    }

    render(){
        return(
            <div className="m-max-center">
                {/*头部搜索框*/}
                <div className="search-wrapper">
                    <div className="search-content">
                        <img className="search-content-img" src="./static/images/icons/searchIcon.png"/>
                        <input className="search-content-input" type="search" placeholder="请输入搜索内容" onKeyUp={search.bind(this)}/>
                    </div>
                    <div className="search-button" onClick={() => {this.props.history.go(-1)}}>
                        取消
                    </div>
                </div>
                {/*历史搜索部分*/}
                <div className="search-history-wrapper">
                    <div className="search-history-title">历史搜索</div>
                    {this._getHistoryItems()}
                    {this.state.searchHistory.length > 0?
                    <div className="search-history-clear" onClick={clearHistory.bind(this)}>清除历史记录</div>
                    :null}
                </div>
            </div>
        );
    }
}