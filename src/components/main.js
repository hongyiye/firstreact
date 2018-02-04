import React from 'react';
import {hongye} from '../js/hongye.js';//自己写的工具类
import Menu from './pub/Menu.js';


//获取服务器数据
function getArticles(param,callback){//获取文章的都用这个请求
    var params = {
                opcode: 'vueArticleList',
                rescode: 'vueArticleListQry',
                blog_type: param.blog_type?param.blog_type:'',
                blog_special_type: param.blog_special_type?param.blog_special_type:'',
                blog_detail_type: param.blog_detail_type?param.blog_detail_type:''
        };
   hongye.basepost('server.vue.query.view.blog.ArticleListService.service',params,callback);
}

//面板选择事件
function panelChange(event){
    var targetDom = event.target;
    if(targetDom.id == 'index_page_button'){
        this.setState({panelFlag: 0});
    }else if(targetDom.id == 'group_page_button'){
        this.setState({panelFlag: 1});
    }
}

export default class Main extends React.Component{//通过继承Component的方式来生成新的组件
    constructor(){
        super();
        this.state = {//存放组件内部的数据
            panelFlag: 0,//显示主页还是列表页面
            noticeItems: [],
            articleItems: [],
            groupItems: []
        };
    }
    

    _gotoSearch(event){//直接这样定义，不加function关键字，不能用箭头函数
        //console.log(event.target);
        //history.push('');
        this.props.history.push('/pub/search/');
        event.stopPropagation();
        return false;
    }

    getGroupItems(){//获取分组列表的绑定事件
        var param = {
            opcode: 'vueGroupleList',
            rescode: 'vueGroupListQry',
            blog_type: ''
        }
        var callback = (resultText) => {
            var result = JSON.parse(resultText);
            var data = result.dataSetResult;
            this.state.groupItems = data;
        }
        hongye.basepost('server.vue.query.view.blog.GroupListService.service',param,callback);
    }
    _getGroupItemView(){
        var i=0;
        var item;
        var res = [];
        for(; i<this.state.groupItems.length; i++){
            item = this.state.groupItems[i];
            res.push(
                <li className="group-item" key={item.blog_type}>
                    <img className="group-item-img" src={item.type_back_img}/>
                    <div className="group-item-info">
                    <div className="group-item-info-name">{item.type_name}</div>
                    <div className="group-item-info-counter">
                        <span className="group-item-info-counter-item">成员:{item.member_counter}</span>
                        <span className="group-item-info-counter-item">帖子:{item.blog_counter}</span>
                    </div>
                    <div className="group-item-info-brief">{item.type_brief}</div>
                    </div>
                </li>    
            );
        }
        return res;
    }

    render(){
        //这里使用箭头函数是为了绑定函数中的this
        var getNoticeItems = () => {//获取公告列表的信息
            var i=0;
            var res = [];
            for(i=0; i<this.state.noticeItems.length; i++){
                res.push(
                <li key={i} className="clear-inline-gap notice-wrapper-li">
                    <div className="userhead">
                        <img className="userhead-img" src={this.state.noticeItems[i].user_icon}/>
                    </div>
                    <div className="normal-fontStyle notice-wrapper-li-content">
                        <span className="notice-wrapper-li-content-span">{this.state.noticeItems[i].blog_title}</span>
                    </div>
                </li>
                );
            }
            return res;
        }

        var getArticleItems = () =>{//获取文章列表的信息
            var i=0;
            var res = [];
            var item;
            for(i=0; i<this.state.articleItems.length; i++){
                item = this.state.articleItems[i];
                res.push(
                    <li className="article-item" key={i}>
                    <div className="article-item-userInfo">
                        <div className="article-item-userhead">
                            <img src="static/images/defaulthead.png" className="article-item-userhead-img"/> 
                        </div>
                        <div className="article-item-userName">{item.blog_author}</div>
                    </div>
                    <div className="article-item-title">
                        {item.blog_special_type == 1&&<span className='article-item-essence'>精</span>}
                        {item.blog_title}
                    </div>
                    <div className="article-brief">
                    {item.blog_brief}
                    </div>
                    <div className="article-img" >
                        <img src={item.blog_img} className="article-item-imgs-img"/>
                    </div>
                    <div className="article-message">
                        <div className="article-message-time">02:42 10/14</div>
                        <div className="article-message-handle">
                            <div>
                                <img className="article-message-handle-img" src="./static/images/icons/commentIcon.png"/>
                                <span>11</span>
                            </div>
                            <div>
                                <img className="article-message-handle-img" src="./static/images/icons/niceIcon.png"/>
                                <span>11</span>
                            </div>
                            <div>
                                <img className="article-message-handle-img" src="./static/images/icons/collectIcon.png"/>
                                <span>11</span>
                            </div>
                        </div>
                    </div>
                </li>
                );
            }
            return res;
        }
        

        return (
        <div className="m-wrapper" id="menu_modular">
            {/*顶部菜单部分 首页列表*/}
            <div className="top-wrapper top-m-wrapper">
                <img className="top-m-userIcon" src="./static/images/defaulthead.png"/>
                <div className="top-m-list" onClick={panelChange.bind(this)}>
                    <span className={'top-m-list-span ' + (this.state.panelFlag == 0? 'top-m-list-span-selected' : 'top-m-list-span-unselected')} id="index_page_button"  >
                        首页
                    </span>
                    <span className={'top-m-list-span ' + (this.state.panelFlag == 1? 'top-m-list-span-selected' : 'top-m-list-span-unselected')} id="group_page_button"  >
                        列表
                    </span>
                </div>
                {/*src,指向当前目录下的静态资源目录static下的图片资源*/}
                <img className="top-m-list-searchIcon" src="./static/images/icons/searchIcon.png" onClick={this._gotoSearch.bind(this)}/>
            </div>
           {/*公告部分*/}
            <div style={{display:this.state.panelFlag == 1?'none':'block'}}>
            <div className="notice-wrapper">
                <ul className="m-center notice-items" id="notice_group">
                    {getNoticeItems()}
                </ul>
            </div>
            {/*文章分类部分*/}
            <div className="article-kind">
                <ul className="m-center">
                    <li className="article-kind-ul-li article-kind-ul-li-sel">全部<span className="article-kind-ul-li-span"></span></li>
                    <li className="article-kind-ul-li">精华<span className="article-kind-ul-li-span"></span></li>
                    <li className="article-kind-ul-li">收藏<span className="article-kind-ul-li-span"></span></li>
                    <li className="article-kind-ul-li">我的<span className="article-kind-ul-li-span"></span></li>
                    <li className="article-kind-ul-li">
                        <img className="article-kind-ul-li-img" src="./static/images/icons/screenIcon.png" />
                    </li>
                </ul>
            </div>
           {/*文章列表部分*/}
            <ul className="m-center">
                {getArticleItems()}
            </ul>
            </div>
            {/*文章分组列表部分*/}
            <ul className="m-center group-wrapper" style={{display:this.state.panelFlag == 0?'none':'block'}}>
                {this._getGroupItemView()}
            </ul>
            {/*公共的地步菜单组件*/}
            <Menu history={this.props.history}></Menu>
        </div>
        );
    }
    componentDidMount(){
        //使用箭头函数，绑定this//避免在回调函数里this指向变了
        var getnoticeCallback = (resultText) =>{
            var result = JSON.parse(resultText);
            this.setState({noticeItems:result.dataSetResult});
        }
        getArticles({blog_type:1},getnoticeCallback);

        var getArticlesCallback = (resultText) =>{
            var result = JSON.parse(resultText);
            this.setState({articleItems:result.dataSetResult});
        }
        getArticles({blog_type:2},getArticlesCallback);

        //获取文章分组列表数据
        this.getGroupItems();
    }
};