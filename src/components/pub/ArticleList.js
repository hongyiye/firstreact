import React from 'react';
import PropTypes from 'prop-types';
import {hongye} from '../../js/hongye.js';//自己写的工具类

//文章列表的公共组件
var gotoDetail = function(blogCode){
    console.log(blogCode);
    this.props.history.push('/ArticleDetail');
}

//获取文章列表
var getArticleItems = function(){//获取文章列表的信息
    var i=0;
    var res = [];
    var item;
    for(i=0; i<this.state.articleItems.length; i++){
        item = this.state.articleItems[i];
        res.push(
            <li className="article-item" key={i} onClick={() => gotoDetail(item.blog_code)}>
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



//获取服务器数据
var getArticles = function(param,callback){//获取文章的都用这个请求
   hongye.basepost('server.vue.query.view.blog.ArticleListService.service',param,callback);
}

var params = {};
//文章列表组件
export default class ArticleList extends React.Component{
    constructor(){
        super();
        this.state = {
            listType: 0,//类型0:文章列表,1:公告列表--默认是0
            articleItems: []
        };
    }

    render(){
        //获取公告列表
    var getNotieItems = () =>{
        var i=0;
        var res = [];
        var item;
        for(i=0; i<this.state.articleItems.length; i++){
            item = this.state.articleItems[i];
            res.push(
            <li key={i} className="clear-inline-gap notice-wrapper-li" onClick={() => gotoDetail.call(this,item.blog_code)}>
                <div className="userhead">
                    <img className="userhead-img" src={item.user_icon}/>
                </div>
                <div className="normal-fontStyle notice-wrapper-li-content">
                    <span className="notice-wrapper-li-content-span">{item.blog_title}</span>
                </div>
            </li>
            );
        }
        return res;
    }
        
        return (
            <div>
                {this.state.listType === 0?getArticleItems.call(this):getNotieItems.call(this)}
            </div>
        );
    }

    componentDidMount(){
        var props = this.props;
        this.setState({
            listType: props.listType?props.listType:0
        });
        params = {
            opcode: 'vueArticleList',
            rescode: 'vueArticleListQry',
            blog_type: props.blog_type?props.blog_type:'',
            blog_special_type: props.blog_special_type?props.blog_special_type:'',
            blog_detail_type: props.blog_detail_type?props.blog_detail_type:''
        };
        var getArticlesCallback = (resultText) =>{
            var result = JSON.parse(resultText);
            this.setState({articleItems:result.dataSetResult});
        }
        getArticles(params,getArticlesCallback);
    }
}



















