import React from 'react';
import { Router } from 'react-router';

const Root = ({browserHistory, routes}) => {
  return(
    <Router history={browserHistory} routes={routes} />
  )
}

export default Root;
