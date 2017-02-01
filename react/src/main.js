import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import routes from './routes';
import Root from './components/Root';

let reactAppRender = (element) => {
  ReactDOM.render(
    <Root browserHistory={browserHistory} routes={routes} />,
    element
  );
};

$(function() {
  let reactApp = document.getElementById('app');
  if (reactApp) {
    reactAppRender(reactApp);
  }
});
