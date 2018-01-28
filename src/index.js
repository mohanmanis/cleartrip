import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import routes from './routes';
import promisePolyfill from 'es6-promise';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

promisePolyfill.polyfill();

const history = useRouterHistory(createHistory)({ basename: '/dashboard/' });

ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);
