import React from 'react';

const Layout = (props) => {
  return(
    <div>
      <li class="has-form">
        <div class="row collapse">
          <div class="large-8 small-9 columns">
            <input type="text" placeholder="Find Stuff" />
          </div>
          <div class="large-4 small-3 columns">
            <a href="#" class="alert button expand">Search</a>
          </div>
        </div>
      </li>
      { props.children }
    </div>
  )
}

export default Layout;
