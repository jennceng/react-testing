import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Bar from './components/Bar';
import Layout from './components/Layout';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={App} />
    <Route path="bars/:id" component={Bar} />
  </Route>
);

export default routes;
