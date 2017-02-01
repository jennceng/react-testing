import React from 'react';

const Layout = (props) => {
  return(
    <div>
      <span>
        When I grow up, I will be a dope header.
      </span>
      <br />
      <h1 className="page-title"> Bars </h1>
      { props.children }
    </div>
  )
}

export default Layout;
