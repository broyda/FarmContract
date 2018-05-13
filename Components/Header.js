import React, {Component} from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import {Link} from '../routes';

export default () =>{
  return(
    <Menu>
        <Link route='/'>
          <a className='item'> Home </a>
        </Link>
        <Link route='/createContract'>
          <a className='item'> Create Contract </a>
        </Link>

        <Dropdown item text='View Contracts'>
             <Dropdown.Menu>
               <Link route='/contractList'>
                    <Dropdown.Item>Owner/Customer</Dropdown.Item>
               </Link>
               <Link route='/viewContractInsurer'>
                  <Dropdown.Item>Insurer</Dropdown.Item>
               </Link>
             </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
          <Link route='/createContract'>
            <a className='item'> + </a>
          </Link>
          <Link route='/'>
            <a className='item'> Contact US </a>
          </Link>
        </Menu.Menu>
    </Menu>
  );
}
