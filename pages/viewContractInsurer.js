import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import web3 from '../ethereum/web3';
import {Grid, Card, Label, Header, Divider, Button, Input, Table, Message} from 'semantic-ui-react';
import DisplayContractDetails from '../Components/DisplayContractDetails';
import InsurerRow from '../Components/InsurerRow';
import BidOnContract  from '../Components/BidOnContract';

class ViewContractInsurer extends Component{
  constructor(props){
    super(props);
    this.state={
      address: this.props.address,
      contractDetails: this.props.details,
      coverageAmount: this.props.coverageAmount,
      searchAddress:'',
      searchLoading: false,
      contractNotFoundMessage:this.props.contractNotFoundMessage,
      biddersInfo: this.props.biddersInfo,
      bidderChoosen: false
    }
}
  static async getInitialProps(props){
    const address = props.query.address;
    if(!address){
      return{contractNotFoundMessage: 'No Contract Details found. Please search using Contract Address'};
    }else{
      const accounts = await web3.eth.getAccounts();
      const farmFactoryObj = farmFactory(address);
      const contractDetails = await farmFactoryObj.methods.getFarmContractDetails().call();
      const numberOfBidders = contractDetails[6];
      const bidderChoosen = await farmFactoryObj.methods.isBidderChoosen().call();
      let biddersInfo;
      if(bidderChoosen){
        const bidderAddress = await farmFactoryObj.methods.insurer().call();
        const amount = await farmFactoryObj.methods.listOfBidders(bidderAddress).call();
          biddersInfo = new Array({
            bidderAddress: bidderAddress, amount: amount, bidderChoosen: true
          });
      }else{
        biddersInfo = await Promise.all(
         Array(parseInt(numberOfBidders))
         .fill(0)
         .map( async (element, index) => {
           const bidderAddress = await farmFactoryObj.methods.biddersAddressArray(index).call();
           const amount = await farmFactoryObj.methods.listOfBidders(bidderAddress).call();
           const bidder = await farmFactoryObj.methods.insurer().call();
           return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false});
         })
       );
      }
    const details ={
          owner: contractDetails[0],
          coordinates: `Lattitide - ${contractDetails[1]} & Langitude - ${contractDetails[2]}`,
          coverageAmtAndContractBalance: `${contractDetails[3]} & 0`,
          listedPrice: contractDetails[4],
          description: contractDetails[5],
          bidders: contractDetails[6],
          biddersInfo: biddersInfo
        };
      return{details: details, address: address, coverageAmount: contractDetails[3]};
    }
  }

  searchContractDetails = async (event) => {
    event.preventDefault();
    if(this.state.searchAddress){
      this.setState({searchLoading: true});
      this.retreiveAndUpdateContractDetails(this.state.searchAddress);
    }
  };

retreiveAndUpdateContractDetails = async (address) => {
  try{
    const accounts = await web3.eth.getAccounts();
    const searchFarmObj = await farmFactory(address);
    const farmDetails = await searchFarmObj.methods.getFarmContractDetails().call();
    const numberOfBidders = farmDetails[6];
    const bidderChoosen = await searchFarmObj.methods.isBidderChoosen().call();
    let biddersInfo;
    if(bidderChoosen){
      const bidderAddress = await searchFarmObj.methods.insurer().call();
      const amount = await searchFarmObj.methods.listOfBidders(bidderAddress).call();
        biddersInfo = new Array({
          bidderAddress: bidderAddress, amount: amount, bidderChoosen: true
        });
    }else{
         biddersInfo = await Promise.all(
          Array(parseInt(numberOfBidders))
          .fill(0)
          .map(async (element, index) => {
            const bidderAddress = await searchFarmObj.methods.biddersAddressArray(index).call();
            const amount = await searchFarmObj.methods.listOfBidders(bidderAddress).call();
            const bidder = await searchFarmObj.methods.insurer().call();
            return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false});
          })
        );
    }
    const contractBalance = await searchFarmObj.methods.contractBalance().call();
    const details ={
                    owner: farmDetails[0],
                    coordinates: `Lattitide - ${farmDetails[1]} & Langitude - ${farmDetails[2]}`,
                    coverageAmtAndContractBalance: `${farmDetails[3]} & ${contractBalance}`,
                    listedPrice: farmDetails[4],
                    description: farmDetails[5],
                    bidders: numberOfBidders,
                    biddersInfo: biddersInfo
                    };
    this.setState({
      address: address,
      searchLoading: false,
      coverageAmount: farmDetails[3],
      contractDetails: details,
      biddersInfo: biddersInfo,
      contractNotFoundMessage:'',
      bidderChoosen: bidderChoosen
    });
  }catch(error){
    console.log('inside catch block', error);
    this.setState({contractNotFoundMessage: 'No details found!. Please verify search criteria.', loading: false});
  }
};

bidOnContract = async (amount) => {
    if(amount && amount !== '' && amount > 0 ){
      try{
        const accounts = await web3.eth.getAccounts();
        const contractObj = farmFactory(this.state.address);
        await contractObj.methods.bid(amount).send({from: accounts[0]});
        this.retreiveAndUpdateContractDetails(this.state.address);
      }catch(error){
        console.log(error);
      }
    }
  }

renderBidderInformation(){
    return this.state.biddersInfo.map((data, index) => {
          return <InsurerRow bidderAddress={data.bidderAddress}
                  amount={data.amount}
                  key={index}
                  bidderChoosen={data.bidderChoosen}
                  />;
              })
  };

  renderContractDetails(){
    if(!this.state.contractNotFoundMessage){
      return <DisplayContractDetails contractDetails={this.state.contractDetails}/>
    }else{
      return(
            <Message negative>
              <Message.Header>
                Contract Details
              </Message.Header>
            <p>
                {this.state.contractNotFoundMessage}
            </p>
            </Message>
         );
    }
  }

  render(){
    const bidInfo = this.state.biddersInfo;
    const {bidderChoosen} = this.state;
    const bidInfoAvailable = bidInfo && bidInfo !== null && typeof bidInfo !== 'undefined' && bidInfo.length > 0;
    return(
      <Layout>
        <Grid color='teal'>
          <Grid.Row>
            <Grid.Column  width={9}>
              <Divider horizontal>CONTRACT INSURER PAGE</Divider>
            </Grid.Column>
            <Grid.Column width={7} textAlign='right'>
              <Input
                value={this.state.searchAddress}
                onChange={(event) => {this.setState({searchAddress: event.target.value})}}
                size='medium' placeholder='Enter Contract Address'
                />
              <Button primary content='search'
                loading={this.state.loading}
                onClick={this.searchContractDetails} floated='right'/>
            </Grid.Column>
          </Grid.Row>
          {!this.state.contractNotFoundMessage &&
            <Grid.Row>
              <Grid.Column>
                  <Divider horizontal fitted>Details of {this.state.address}</Divider>
              </Grid.Column>
            </Grid.Row>
          }
          <Grid.Row>
            <Grid.Column width={9}>
              {this.renderContractDetails()}
            </Grid.Column>

            {!this.state.contractNotFoundMessage &&
                <Grid.Column width={7} floated='right' container='true'>
                {!bidderChoosen &&
                  <BidOnContract bidOnContract={this.bidOnContract}/>
                }

                {bidderChoosen &&
                  <div style={{marginTop:'25px'}}>
                      <Label color="green" pointing='below' size='small'>Following Insurer has been choosen by Contract Owner</Label>
                  </div>
                }
                {!bidderChoosen && bidInfoAvailable &&
                  <div style={{marginTop:'25px'}}>
                      <Label color="green" pointing='below' size='small'>Following Quotes are provided by different Insurer!!</Label>
                  </div>
                }
                {bidInfo && bidInfoAvailable &&
                        <Table textAlign='center' size='small' striped compact celled selectable color='green'>
                          <Table.Header>
                            <Table.Row >
                              <Table.HeaderCell>Address Of Insurer</Table.HeaderCell>
                              <Table.HeaderCell>Quote/Premium</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {this.renderBidderInformation()}
                          </Table.Body>
                        </Table>
                }
                </Grid.Column>
               }
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewContractInsurer;
