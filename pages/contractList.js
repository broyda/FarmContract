import React, {Component} from 'react';
import {Card, Divider} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Layout from '../Components/LayoutComponent';

class ContractList extends Component{
  constructor(props){
    super(props);
    this.items='';
  }

  fetchContractAddressList = async () =>{
  const accounts = await web3.eth.getAccounts();
  const addressList = await factory.methods.getContractByAddress(accounts[0]).call();
  const items = addressList.map((address, index) => {
      return ({
          header: address,
          description: 'Address of the Contract!',
          meta: 'Address',
          fluid: true
        });
  });
  this.items = items;
  }

  render(){
    this.fetchContractAddressList();
    return(
      <Layout>
        <div style={{marginTop:'15px'}}>
          <Divider horizontal>Welcome to Contracts Home page</Divider>
          <Card.Group items={this.items}/>
        </div>
      </Layout>
    );
  }
}

export default ContractList;
