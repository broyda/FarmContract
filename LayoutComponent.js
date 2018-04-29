import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
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
          </Head>
          <div style={{marginTop:'10px'}}>
              <h3><center>Welcome to Farm Contract!!!</center></h3>
              <hr/>
                  {this.props.children}
              <hr />
          </div>
        </Container>
      );
    }
}

export default Layout;
