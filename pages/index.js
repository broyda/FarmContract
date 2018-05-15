import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';

class FarmContractIndex extends Component{
  render(){
    return(
      <div style={{backgroundColor:'#b2cecf', width:'100%', height: '610px', backgroundImage: 'url(../images/farm_header.jpg)'}}>
        <Layout>
          <div style={{marginTop: '150px', color:'#EB593C'}}>
              <center><h3>Welcome to Farm Contract Marketplace!!!!!</h3></center>
          </div>
        </Layout>
      </div>
    );
  }
}

export default FarmContractIndex;
