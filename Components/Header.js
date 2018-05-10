import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () =>{
  return(
    <Menu>
        <Link route='/'>
          <a className='item'> Home </a>
        </Link>
        <Link route='/create'>
          <a className='item'> Create Contract </a>
        </Link>

        <Link route='/viewContractOwner'>
          <a className='item'> View Contracts - Owner</a>
        </Link>

        <Link route='/viewContractInsurer'>
          <a className='item'> View Contracts - Insurer </a>
        </Link>

        <Menu.Menu position='right'>
          <Link route='/create'>
            <a className='item'> + </a>
          </Link>
          <Link route='/'>
            <a className='item'> Contact US </a>
          </Link>
        </Menu.Menu>
    </Menu>
  );
}
