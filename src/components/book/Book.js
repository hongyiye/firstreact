import React from 'react';
import Menu from '../pub/Menu.js';
import {hongye} from '../../js/hongye.js';

function getBookList(){//获取轻小说的列表
    var param = {
        opcode: 'bookInfo',
        rescode: 'bookListQry',
        start: 0,
        limit: 30
    };
    var callback = (resultText) => {
        var result = JSON.parse(resultText);
        var data = result.dataSetResult;
        this.setState({bookList: data});
    };
    hongye.basepost('server.vue.query.book.BookInfoService.service',param,callback);
}

export default class Book extends React.Component{
    constructor(){
        super();
        this.state={
            menuId: 3,
            bookList: []
        };
    }

    createBookList(){//组装作品列表的dom
        var item;
        var res = [];
        for(var i=0; i<this.state.bookList.length; i++){
            item = this.state.bookList[i];
            res.push(
                <li className="opus-list-item" key={item.book_id}>
                    <img src={item.book_cover} className="opus-list-item-cover"/>
                    <div className="opus-list-item-title">{item.book_title}</div>
                </li>
            );
        }
        return res;
    }

    render(){
        return (
            <div>
                {/*顶部标题*/}
                <div className="top-title-wrapper">轻小说</div>
                {/*搜索框*/}
                <div className="inner-search-wrapper">
                    <input className="inner-search-input" placeholder="请输入搜索内容"/>
                </div>
                {/*作品分类部分*/}
                <ul className="opus-type-wrapper">
                    <li className="opus-type-item opus-type-item-sel">更新</li>
                    <li className="opus-type-item">已订阅</li>
                    <li className="opus-type-item">已离线</li>
                </ul>
                {/*作品列表部分*/}
                <ul className="opus-list-wrapper">
                    {this.createBookList()}
                </ul>
                {/*公共的菜单组件*/}
                <Menu history={this.props.history} selMenu={this.state.menuId}></Menu>
            </div>
        );
    }
    componentDidMount(){
        getBookList.call(this);
    }
}