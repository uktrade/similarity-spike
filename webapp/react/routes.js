import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Homepage from './components/homepage';
import Opportunities from './components/opportunities';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Homepage} />
    <Route path="opportunities/:name" component={Opportunities} />
  </Route>
);
