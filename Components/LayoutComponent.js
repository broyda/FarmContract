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
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyg4Fk3yo2u4VSgH3Y51AFWR8SlDofeio&sensor=false">
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
