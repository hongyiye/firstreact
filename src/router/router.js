//路由
import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';//BrowserRouter

import Main from '../components/main';
import Comic from '../components/comic/Comic.js';
import Book from '../components/book/Book.js';
import UserInfo from '../components/user/UserInfo.js';

import ArticleDetail from '../components/article/ArticleDetail.js';
//公共的页面
import Search from '../components/pub/Search.js';

export default class RouterMap extends React.Component{
    render(){
        return (
            <Router>
                <Switch>{/*BrowserRouter规定只有一个子节点，所以加上这个div*/}
                    {/*功能页面*/}
                    <Route exact path="/" component={Main}/>{/*给主页路径添加exact属性 若不添加则会匹配所有子路径导致所有的跳转都跳转到子路径去*/}
                    <Route exact path="/comic" component={Comic}/>
                    <Route exact path="/book" component={Book}/>
                    <Route exact path="/user/userinfo" component={UserInfo}/>

                    <Route exact path="/ArticleDetail" component={ArticleDetail}/>
                    {/*公共的页面*/}
                    <Route path="/pub/search/" component={Search}/>
                </Switch>
            </Router>
        );
    }
};

