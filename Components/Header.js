import React, {Component} from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import {Link} from '../routes';

class Header extends Component{
  render(){
    const styleObj = {color:'#BD3632', fontWeight: 'bold'};
    return(
      <Menu>
          <Link route='/'>
            <a className='item'><span style={styleObj}>Home</span></a>
          </Link>
          <Link route='/createContract'>
            <a className='item'><span style={styleObj}>Get Insurance</span></a>
          </Link>

          <Dropdown item text='View Insurance Contracts'>
               <Dropdown.Menu>
                 <Link route='/contractListOwner'>
                      <Dropdown.Item><span style={styleObj}>My Contracts</span></Dropdown.Item>
                 </Link>
                 <Link route='/contractListInsurer'>
                    <Dropdown.Item><span style={styleObj}>Leads For Biddding</span></Dropdown.Item>
                 </Link>
               </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>
            <Link route='/createContract'>
              <a className='item'> <span style={styleObj}>+</span></a>
            </Link>
            <Link route='/'>
              <a className='item'> <span style={styleObj}>Login</span> </a>
            </Link>
          </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
