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
      <div style={{backgroundColor:'#F2EFE4'}}>
        <Layout>
          <div style={{marginTop:'25px'}}/>
          <Divider horizontal>Welcome to Contracts Home page</Divider>
          <div style={{marginTop:'25px'}}/>
          {this.state.items &&
              <Table textAlign='center' size='small' striped compact celled selectable>
                <Table.Header>
                  <Table.Row>
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
                </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.renderContractRow()}
                </Table.Body>
              </Table>
          }
        </Layout>
      </div>
    );
  }
}

export default ContractList;
