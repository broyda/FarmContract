import React, {Component} from 'react';
import {Card, Divider, Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import ContractInsurerRow from '../Components/ContractInsurerRow';

class ContractListInsurer extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:''
    };
  }

  fetchContractAddressList = async () =>{
  if(!this.state.items){
    const accounts = await web3.eth.getAccounts();
    const addressList = await factory.methods.getContractOwners().call();

    const allContracts = await Promise.all(
      addressList.map(async (address) => {
          if(address !== accounts[0]){
            return await factory.methods.getContractByAddress(address).call();
          }else{
              return [];
          }
      })
    );

    let addressArrayFinal = [];
    for(let i=0; i< allContracts.length; i++){
        let addressArray = allContracts[i];
        for(let k=0; k< addressArray.length; k++){
          addressArrayFinal.push(addressArray[k]);
        }
    }

    const items = await Promise.all(
        addressArrayFinal.map(async (address, index) => {
        const farmObj = farmFactory(address);
        const details = await farmObj.methods.getFarmContractDetails().call();
            return ({
                address: address,
                coverageAmount: details[3],
                listedPrice: details[4],
                description: details[5]
              });
        })
    );
    this.setState({items: items});
    }
  }

  renderContractRow = () =>{
    return this.state.items.map((item, index) => {
      return <ContractInsurerRow key={index} item={item} />;
    });
  }

  render(){
    const style = {color:'#d02552', fontWeight: 'bolder'};
    this.fetchContractAddressList();
    return(
      <div style={{backgroundColor:'#b2cecf', width:'100%', height:'600px'}}>
        <Layout>
          <div style={{marginTop:'25px'}}/>
          <Divider horizontal><span style={style}>LIST OF AVAILABLE CONTRACTS- INSURER</span></Divider>
          <div style={{marginTop:'25px'}}/>
          {this.state.items &&
              <Table textAlign='center' size='small' striped compact celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <span style={style}>Address</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Description</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Coverage Amount</span>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <span style={style}>Listed Price</span>
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
        </Layout>
      </div>
    );
  }
}

export default ContractListInsurer;
