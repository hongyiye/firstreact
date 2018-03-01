import React from 'react';

export default class ArticleTail extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return(
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
        );
    }
}