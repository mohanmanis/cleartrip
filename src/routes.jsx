import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App/App';
import HomePage from './Home/HomePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
    </Route>
);
