import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Search from './components/search';
import Company from './components/company';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Search} />
    <Route path="company/:name" component={Company} />
  </Route>
);
