import React from 'react';
import Menu from '../pub/Menu.js';
import {hongye} from '../../js/hongye.js';

function getComicList(){//获取远程漫画列表的数据
    var param = {
        opcode: 'comicInfo',
        rescode: 'comicListQry',
        start: 0,
        limit: 30
    };
    var callback = (resultText) => {
        var result = JSON.parse(resultText);
        var data = result.dataSetResult;
        this.setState({comicList: data});
    };
    hongye.basepost('server.vue.query.comic.ComicInfoService.service',param,callback);
}

function gotoSearch(event){
    this.props.history.push('/pub/search/');
    event.stopPropagation();
}

export default class Comic extends React.Component{
    constructor(){
        super();
        this.state = {
            menuId: 1,
            comicList: []
        };
    }
    createComicList(){//组装作品列表的dom
        var item;
        var res = [];
        for(var i=0; i<this.state.comicList.length; i++){
            item = this.state.comicList[i];
            res.push(
                <li className="opus-list-item" key={item.comic_id}>
                    <img src={item.comic_cover} className="opus-list-item-cover"/>
                    <div className="opus-list-item-title">{item.comic_title}</div>
                </li>
            );
        }
        return res;
    }
    render(){
        return (
            <div>
                {/*顶部标题*/}
                <div className="top-title-wrapper">漫画</div>
                {/*搜索框*/}
                <div className="inner-search-wrapper">
                    <input className="inner-search-input" placeholder="请输入搜索内容" onClick={gotoSearch.bind(this)}/>
                </div>
                {/*作品分类部分*/}
                <ul className="opus-type-wrapper">
                    <li className="opus-type-item opus-type-item-sel">更新</li>
                    <li className="opus-type-item">已订阅</li>
                    <li className="opus-type-item">已离线</li>
                </ul>
                {/*作品列表部分*/}
                <ul className="opus-list-wrapper">
                   {this.createComicList()}
                </ul>
                {/*公共的菜单组件*/}
                <Menu history={this.props.history} selMenu={this.state.menuId}></Menu>
            </div>
        );
    }

    componentDidMount(){
        getComicList.call(this);
    }
}