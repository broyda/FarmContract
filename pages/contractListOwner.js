import React, {Component} from 'react';
import {Card, Divider, Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import ContractRow from '../Components/ContractOwnerRow';
import {Link} from '../routes';

class ContractListOwner extends Component{
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
    const style = {color:'#d02552', fontWeight: 'bolder'};
    this.fetchContractAddressList();
    return(
      <div style={{backgroundColor:'#FFE361', width:'100%', height:'635px'}}>
        <Layout>
          <div style={{marginTop:'25px'}}/>
          <Divider horizontal><span style={style}>My CONTRACT's DETAILS</span></Divider>
          <div style={{marginTop:'50px'}}/>
          {this.state.items &&
              <Table textAlign='center' size='large' striped compact celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <span style={style}>Description</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Address</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Number of Bidders</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Click Here</span>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.renderContractRow()}
                </Table.Body>
              </Table>
          }

          {!this.state.items &&
            <div>
              <div style={{marginTop:'100px'}}/>
              <Divider horizontal><span style={style}>Currently No Contracts have been created by you!!!</span></Divider>

                <h4 style={{textAlign:'right'}}>
                  <Link route='/createContract'>
                      <a>
                      <u style={{color:'#222930'}}>CLICK HERE TO CREATE A CONTRACT</u>
                    </a>
                  </Link>
                </h4>
            </div>
          }
        </Layout>
      </div>
    );
  }
}

export default ContractListOwner;
