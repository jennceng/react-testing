import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import BarsIndexContainer from './containers/BarsIndexContainer';
import BarShowContainer from './containers/BarShowContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={BarsIndexContainer} />
    <Route path="bars/:id" component={BarShowContainer} />
  </Route>
);

export default routes;
