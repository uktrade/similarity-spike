import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from './components/layout';
import CompanyList from './components/companylist';


export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={CompanyList} />
  </Route>
);
