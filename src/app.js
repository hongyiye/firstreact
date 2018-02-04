import css from './app.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import RouterMap from './router/router.js'

ReactDOM.render(//render方法将模板语言转换为HTML语言，并插入指定的dom
	<RouterMap>
	</RouterMap>,
	document.getElementById('root')
);