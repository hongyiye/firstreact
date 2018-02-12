import React from 'react';
//底部菜单部分----公共组件

function menuChange(itemid,event){
    //获取当前的点击对象，不是点击的原始对象
    if(itemid == this.state.selItem){
        return;
    }
    this.setState({selItem: itemid});
    this.props.history.push(this.state.menuItems[itemid].menuUrl);
    event.stopPropagation();
}

class Menu extends React.Component{
    constructor(){
        super();
        this.state = {
            selItem: '0',
            menuItems: [
                {menu_id:'0',menuUrl:'/',className:'bottom-menu-item-title',srcLink:'static/images/icons/menugroupunsel.png',menuTiele:'圈子'},
                {menu_id:'1',menuUrl:'/comic/',className:'bottom-menu-item-title',srcLink:'static/images/icons/menucomicunsel.png',menuTiele:'漫画'},
                {menu_id:'2',menuUrl:'/',className:'bottom-menu-item-title',srcLink:'static/images/icons/menupushicon.png',menuTiele:''},
                {menu_id:'3',menuUrl:'/book/',className:'bottom-menu-item-title',srcLink:'static/images/icons/menubookunsel.png',menuTiele:'轻小说'},
                {menu_id:'4',menuUrl:'/user/userinfo/',className:'bottom-menu-item-title',srcLink:'static/images/icons/menumessageunsel.png',menuTiele:'消息'}
            ],
            selectedMenu: [
                {menu_id:'0',className:'bottom-menu-item-sel',srcLink:'static/images/icons/menugroupicon.png',menuTiele:'圈子'},
                {menu_id:'1',className:'bottom-menu-item-sel',srcLink:'static/images/icons/menucomicicon.png',menuTiele:'漫画'},
                {menu_id:'2',className:'bottom-menu-item-sel',srcLink:'static/images/icons/menupushicon.png',menuTiele:''},
                {menu_id:'3',className:'bottom-menu-item-sel',srcLink:'static/images/icons/menubookicon.png',menuTiele:'轻小说'},
                {menu_id:'4',className:'bottom-menu-item-sel',srcLink:'static/images/icons/menumessage.png',menuTiele:'消息'}
            ]
        };
    }


    render(){
        var getMenu = () =>{
            var i = 0;
            var res = [];
            var item;
            for(i=0; i<this.state.menuItems.length; i++){
                item = this.state.menuItems[i];
                if(item.menu_id == this.state.selItem){
                    item = this.state.selectedMenu[i];
                }
                res.push(
                    <div className="bottom-menu-item" key={i} onClick={menuChange.bind(this,i)}>
                        <img className={i!=2?"bottom-menu-item-img":"bottom-menu-mainItem"} src={item.srcLink} />
                        <div className={item.className}>{item.menuTiele}</div>
                    </div>
                );
            }
            return res;
        };

        return (
            <div className="bottom-menu">
                {getMenu()}
            </div>
        );
    }
    componentDidMount(){
        this.setState({
            selItem: this.props.selMenu?this.props.selMenu:this.state.selItem
        });
    }
}

export default Menu;