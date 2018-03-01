import React from 'react';


class Comment extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return (
            <div className="user-comment">
                <div className="userInfo">
                <div className="userhead">
                    <img src="static/images/defaulthead.png"/> 
                </div>
                <div className="userName">紅一葉</div>
                </div>
                <div className="comment-text">
                <p>支持一下！</p>
                <p>[赞]</p>
                <p><br/></p>
                </div>
                <div className="comment-time">1楼 10:16 10/17</div>
            </div>
        );
    }
}

export {Comment};