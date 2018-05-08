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
      coverageAmount: this.props.coverageAmount,
      searchAddress:'',
      bidAmount:'',
      loading: false,
      bidLoadingSpinner: false,
      chooseBidderSpinner: false,
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
      const biddersInfo = await Promise.all(
            Array(parseInt(numberOfBidders))
            .fill(0)
            .map((element, index) => {
              return this.getBidderInfo(farmFactoryObj, index);
            })
          );

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
      this.setState({loading: true});
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
          .map((element, index) => {
            return this.getBidderInfo(searchFarmObj, index);
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
      loading: false,
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

getBidderInfo = async (searchFarmObj, index) => {
      const bidderAddress = await searchFarmObj.methods.biddersAddressArray(index).call();
      const amount = await searchFarmObj.methods.listOfBidders(bidderAddress).call();
      const bidder = await searchFarmObj.methods.insurer().call();
      return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false});
    };

bidOnContract = async () => {
    const bidAmount = this.state.bidAmount;
    if(bidAmount !== '' && bidAmount > 0 ){
      this.setState({bidLoadingSpinner: true});
      try{
        const accounts = await web3.eth.getAccounts();
        const contractObj = farmFactory(this.state.address);
        await contractObj.methods.bid(this.state.bidAmount).send({from: accounts[0]});
        this.retreiveAndUpdateContractDetails(this.state.address);
      }catch(error){
        console.log(error);
      }
      this.setState({bidLoadingSpinner: false});
    }
  }

  chooseBidder = async (address, amount) => {
      this.setState({chooseBidderSpinner: true});
      try{
        const accounts = await web3.eth.getAccounts();
        const contractObj = farmFactory(this.state.address);
        await contractObj.methods.chooseBidder(address).send({from: accounts[0], value: amount});
        this.retreiveAndUpdateContractDetails(this.state.address);
      }catch(error){
        console.log('error occured inside chooseBidder', error);
      }
      this.setState({bidLoadingSpinner: false});
    }

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
          {!this.state.contractNotFoundMessage &&
            <Grid.Row>
              <Grid.Column>
                  <Divider horizontal>Details of {this.state.address}</Divider>
              </Grid.Column>
            </Grid.Row>
          }
          <Grid.Row>
            <Grid.Column width={9}>
              {this.renderContractDetails()}
            </Grid.Column>

            {!this.state.contractNotFoundMessage &&
                <Grid.Column width={7} floated='right' container='true'>
                    <BiddingDetails
                      bidAmount={this.state.bidAmount}
                      bidLoadingSpinner={this.state.bidLoadingSpinner}
                      chooseBidderSpinner={this.state.chooseBidderSpinner}
                      bidOnContract={this.bidOnContract}
                      biddersInfo={this.state.biddersInfo}
                      updateBiddingAmount={(event) => this.setState({bidAmount: event.target.value})}
                      bidderChoosen= {this.state.bidderChoosen}
                      chooseBidder={this.chooseBidder}
                    />
                  { this.state.bidderChoosen &&
                        <div>
                          <br/>
                          <br/>
                          <Label pointing='below' color='blue' size='tiny'>Pay Coverage Amount of
                            <u> {this.state.coverageAmount} wei</u> And Accept The Contract
                          </Label>
                          <br/>
                          <div>
                            <Input label='wei' labelPosition='right' placeholder='Coverage Amount'></Input>
                            <Button primary floated='right'>Accept Contract</Button>
                          </div>
                        </div>
                  }
                </Grid.Column>
               }
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewContract;
