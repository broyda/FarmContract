import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import web3 from '../ethereum/web3';
import {Grid, Card, Label, Header, Divider, Button, Input, Table, Message} from 'semantic-ui-react';
import DisplayContractDetails from '../Components/DisplayContractDetails';
import BiddingDetails from '../Components/BiddingDetails';

class ViewContract extends Component{
  constructor(props){
    super(props);
    this.state={
      address: this.props.address,
      contractDetails: this.props.details,
      searchAddress:'',
      bidAmount:'',
      loading: false,
      bidLoadingSpinner: false,
      contractNotFoundMessage:this.props.contractNotFoundMessage
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
      const details ={
          owner: contractDetails[0],
          coordinates: `Lattitide - ${contractDetails[1]} & Langitude - ${contractDetails[2]}`,
          coverageAmount: contractDetails[3],
          listedPrice: contractDetails[4],
          description: contractDetails[5],
          bidders: contractDetails[6]
        };
      return{details: details, address: address};
    }
  }

  searchContractDetails = async (event) => {
    event.preventDefault();
    if(this.state.searchAddress){
      this.setState({loading: true});
      this.retreiveAndUpdateContractDetails();
    }
  };

retreiveAndUpdateContractDetails = async () => {
  try{
    const accounts = await web3.eth.getAccounts();
    const searchFarmObj = await farmFactory(this.state.searchAddress);
    const farmDetails = await searchFarmObj.methods.getFarmContractDetails().call();
    const details ={
        owner: farmDetails[0],
        coordinates: `Lattitide - ${farmDetails[1]} & Langitude - ${farmDetails[2]}`,
        coverageAmount: farmDetails[3],
        listedPrice: farmDetails[4],
        description: farmDetails[5],
        bidders: farmDetails[6]
      };
  this.setState({
    address: this.state.searchAddress,
    loading: false,
    contractDetails: details
  });
}catch(error){
  console.log(error);
  this.setState({contractNotFoundMessage: 'No details found!. Please reverify search criteria.'});
}
this.setState({loading: false});
};

  bidOnContract = async () => {
    const bidAmount = this.state.bidAmount;
    if(bidAmount !== '' && bidAmount > 0 ){
      this.setState({bidLoadingSpinner: true});
      try{
        const accounts = await web3.eth.getAccounts();
        const contractObj = farmFactory(this.state.address);
        await contractObj.methods.bid(this.state.bidAmount).send({from: accounts[0]});
        this.retreiveAndUpdateContractDetails();
      }catch(error){
        console.log(error);
      }
        this.setState({bidLoadingSpinner: false});
    }
  }

  renderContractDetails(){
    if(this.state.address){
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
    return(
      <Layout>
        <Grid color='teal'>
          <Grid.Row>
            <Grid.Column  width={9}>
              <Divider horizontal>FARM CONTRACT DEATILS PAGE!!</Divider>
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
          <Grid.Row>
            <Grid.Column width={9}>
              {this.renderContractDetails()}
            </Grid.Column>

            {this.state.address &&
              <Grid.Column width={7} floated='right' container='true'>
                  <BiddingDetails
                    bidAmount={this.state.bidAmount}
                    bidLoadingSpinner={this.state.bidLoadingSpinner}
                    bidOnContract={this.bidOnContract}
                    updateBiddingAmount={(event) => this.setState({bidAmount: event.target.value})}
                  />
              </Grid.Column> }
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewContract;
