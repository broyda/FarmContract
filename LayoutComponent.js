import React, {Component} from 'react';
import {Container, Menu} from 'semantic-ui-react';
import Head from 'next/head';

class Layout extends Component{
    render(){
      return(
        <Container>
          <Head>
            <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css">
            </link>
            <script type="text/javascript"
                src="http://maps.googleapis.com/maps/api/js?sensor=false">
            </script>
          </Head>
          <div style={{marginTop:'15px'}}>
              <Menu color='blue'>
                  <Menu.Item name='home' active={true}>
                      Home
                  </Menu.Item>
                  <Menu.Item name='create'>
                      Create Contract
                  </Menu.Item>

                  <Menu.Item name='view'>
                      View Contract
                  </Menu.Item>

                  <Menu.Menu position='right'>
                      <Menu.Item name='contactus' active={true}>
                          Contact Us
                      </Menu.Item>
                  </Menu.Menu>
              </Menu>

                  {this.props.children}
          </div>
        </Container>
      );
    }
}

export default Layout;
