import React, {Component} from 'react';
import factoryContractObj from '../ethereum/factory';
import Layout from '../LayoutComponent';

class FarmContractIndex extends Component{

  static async getInitialProps(props) {
    const address = factoryContractObj.options.address;
    console.log(address);
    return {address};
  }
  render(){
    return(
      <Layout>
        <h3><center>Welcome to Farm Contract!!!</center></h3>
      </Layout>

    );
  }
}

export default FarmContractIndex;
