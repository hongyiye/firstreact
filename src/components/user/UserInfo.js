import React from 'react';
import Menu from '../pub/Menu.js';

export default class UserInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            menuId: 4
        };
    }

    render(){
        return (
            <div>
                <h1>用户信息页面</h1>
                {/*公共的菜单组件*/}
                <Menu history={this.props.history} selMenu={this.state.menuId}></Menu>
            </div>
        );
    }
}