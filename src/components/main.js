import React from 'react';
import {hongye} from '../js/hongye.js';//自己写的工具类
import Menu from './pub/Menu.js';
import ArticleList from './pub/ArticleList.js';

//面板选择事件
function panelChange(event){
    var targetDom = event.target;
    if(targetDom.id == 'index_page_button'){
        this.setState({panelFlag: 0});
    }else if(targetDom.id == 'group_page_button'){
        this.setState({panelFlag: 1});
    }
    event.stopPropagation();
}

export default class Main extends React.Component{//通过继承Component的方式来生成新的组件
    constructor(){
        super();
        this.state = {//存放组件内部的数据
            menuId: 0,
            panelFlag: 0,//显示主页还是列表页面
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
                    <ArticleList blog_type={1} listType={1} history={this.props.history}></ArticleList>
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
           {/*文章列表部分{getArticleItems()}*/}
            <ul className="m-center">
                <ArticleList blog_type={2} history={this.props.history}></ArticleList>
            </ul>
            </div>
            {/*文章分组列表部分*/}
            <ul className="m-center group-wrapper" style={{display:this.state.panelFlag == 0?'none':'block'}}>
                {this._getGroupItemView()}
            </ul>
            {/*公共的菜单组件*/}
            <Menu history={this.props.history} selMenu={this.state.menuId}></Menu>
        </div>
        );
    }
    componentDidMount(){
        //获取文章分组列表数据
        this.getGroupItems();
    }
};