import React, {Component} from 'react';
import {Container, Menu} from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

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
              <Header/>
              {this.props.children}
          </div>
        </Container>
      );
    }
}

export default Layout;
