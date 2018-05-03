import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () =>{
  return(
    <Menu color='teal'>
        <Link route='/'>
          <a className='item'> Home </a>
        </Link>
        <Link route='/create'>
          <a className='item'> Create Contract </a>
        </Link>

        <Link route='/view'>
          <a className='item'> View Contract </a>
        </Link>

        <Menu.Menu position='right'>
        <Link route='/'>
          <a className='item'> Contact US </a>
        </Link>
        </Menu.Menu>
    </Menu>
  );
}
