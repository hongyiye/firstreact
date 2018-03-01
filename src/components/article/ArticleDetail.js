import React from 'react';
import GoBack from '../pub/GoBack.js';
import ArticleTail from '../pub/ArticleTail.js';
//import Comment from '../pub/Comment.js';
import {Comment} from '../index.js';

export default class ArticleDetail extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <GoBack title="帖子详情" history={this.props.history}></GoBack>
                {/*文章内容部分*/}
                <div className="article-detail-wrapper">
                    <div className="m-max-center">
                        <div className="article-detail-title">
                        最新！！！Pr小站新活动——自创四格漫画（10.18-11.5日 ）
                        </div>
                        {/*这里存放用户信息，弄成公共的组件*/}
                        <div className="article-item-userInfo">
                            <div className="article-item-userhead">
                                <img src="static/images/defaulthead.png" className="article-item-userhead-img"/>
                            </div>
                            <div className="article-item-userName">紅一葉</div>
                        </div>
                        {/*文章内容*/}
                        <div>
                        <p>爱看漫画的你，有没有遇到这样一种时候：一个绝逼好顶赞的漫画创意突如其来，然而当你提笔欲画时，却想起自己惨不忍睹的灵魂画风</p>
                        <p><img src="static/resource/post/img/2c1e691cfce8f8c7b05b.png" /><br/></p>
                        <br/>
                        <p>不要紧，那都不是事儿，本期PR自创四格漫画活动必将满足你波涛汹涌的创作欲！</p>
                        <p>只要你从任意ACG（动画、漫画、游戏截图、黑白彩色均可）作品中，挑选出四张图片，并按照你心目中的创意拼成一张结构完整、衔接圆润的四格漫画，再配上几句槽点十足的台词，将其以符合范例的格式发表在PRACG小站里，就能参加本期活动，获得点赞多多的作品还有机会赢得小编精心准备的好礼哦！</p>
                        <p>为了方便大家尽情发挥创意，本次活动对参加作品的要求很宽松：</p>
                        <p>每一格形状不强求一致，</p>
                        <p>每一格台词都可以篡改，</p>
                        <p>来源漫画越有名越吸睛，</p>
                        <p>剧情转折越惊奇越吸赞！</p>
                        <p>★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★★☆★☆★☆</p>
                        <p>※范例：</p>
                        <p>帖子标题=【PRACG四格漫画】+自己取个标题如“你最喜欢谁”</p>
                        </div>
                        <ArticleTail></ArticleTail>
                    </div>
                </div>
                <div>
                    <Comment></Comment>
                    <Comment></Comment>
                    <Comment></Comment>
                    <Comment></Comment>
                    <Comment></Comment>
                </div>
            </div>
        );
    }
}