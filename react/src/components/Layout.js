import React from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton.js';

const Layout = (props) => {
  return(
    <div>
      <BackButton />
      <span>
        When I grow up, I will be a dope header.
      </span>
      <br />
      <Link to='/'> HOME </Link>
      <Link to='/'>  </Link>
      <br />
      <h1 className="page-title"> Bars </h1>
      { props.children }
    </div>
  )
}

export default Layout;
