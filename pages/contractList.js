import React, {Component} from 'react';
import {Card, Divider, Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import ContractRow from '../Components/ContractRow';

class ContractList extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:''
    };
  }

  fetchContractAddressList = async () =>{
  if(!this.state.items){
    const accounts = await web3.eth.getAccounts();
    const addressList = await factory.methods.getContractByAddress(accounts[0]).call();
    const items = await Promise.all(
        addressList.map(async (address, index) => {
        const farmObj = farmFactory(address);
        const details = await farmObj.methods.getFarmContractDetails().call();
            return ({
                address: address,
                description: details[5],
                numberOfBidders: details[6]
              });
        })
    );
    this.setState({items: items});
  }
  }

  renderContractRow = () =>{
    return this.state.items.map((item, index) => {
      return <ContractRow key={index} item={item} />;
    });
  }

  render(){
    this.fetchContractAddressList();
    return(
      <Layout>
        <div style={{marginTop:'15px'}}>
          <Divider horizontal>Welcome to Contracts Home page</Divider>
          {this.state.items &&
            <div style={{marginTop:'25px'}}>
              <Table textAlign='center' size='small' striped compact celled selectable>
                <Table.Header>
                  <Table.HeaderCell>
                    Address
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Description
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Number of Bidders
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Click Here
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {this.renderContractRow()}
                </Table.Body>
              </Table>
            </div>
          }
        </div>
      </Layout>
    );
  }
}

export default ContractList;
