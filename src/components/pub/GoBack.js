import React from 'react';

export default class GoBack extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '标题'
        };
    }

    render(){
        return(
            <div className="goback-top-wrapper">
                <img src="static/images/icons/mobileGoBackIcon.png" className="goback-top-goback" onClick={() => this.props.history.go(-1)}/>
                <span className="goback-top-title">{this.state.title}</span>
            </div>
        );
    }

    componentDidMount(){
        this.setState({
            title: this.props.title
        });
    }
}