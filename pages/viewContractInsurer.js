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
      bidderChoosen: this.props.bidderChoosen
    }
}
  static async getInitialProps(props){
    const address = props.query.address;
    if(!address){
      return{contractNotFoundMessage: 'No Contract Details found. Please search using Contract Address'};
    }else{
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
           return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false,
              showCancelButton: !bidderChoosen});
         })
       );
      }
    const contractBalance = await farmFactoryObj.methods.contractBalance().call();
    const details ={
          owner: contractDetails[0],
          coordinates: `Lattitide - ${contractDetails[1]} & Langitude - ${contractDetails[2]}`,
          coverageAmtAndContractBalance: `${contractDetails[3]}, ${contractBalance}`,
          listedPrice: contractDetails[4],
          description: contractDetails[5],
          bidders: contractDetails[6]
        };
      return{details: details, address: address, coverageAmount: contractDetails[3],
         biddersInfo: biddersInfo, bidderChoosen: bidderChoosen};
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
    console.log(accounts[0]);
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
            return({bidderAddress: bidderAddress, amount: amount,
              bidderChoosen: false, showCancelButton: accounts[0] === bidderAddress});
          })
        );
    }
    const contractBalance = await searchFarmObj.methods.contractBalance().call();
    const details ={
                    owner: farmDetails[0],
                    coordinates: `Lattitide - ${farmDetails[1]} & Langitude - ${farmDetails[2]}`,
                    coverageAmtAndContractBalance: `${farmDetails[3]},${contractBalance}`,
                    listedPrice: farmDetails[4],
                    description: farmDetails[5],
                    bidders: numberOfBidders
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
        await contractObj.methods.bid(amount).send({from: accounts[0], value: this.state.coverageAmount});
        this.retreiveAndUpdateContractDetails(this.state.address);
      }catch(error){
        console.log(error);
      }
    }
  }

  cancelBid = async () =>{
    try{
      const accounts = await web3.eth.getAccounts();
      const farmContractObj = await farmFactory(this.state.address);
      await farmContractObj.methods.cancelBid().send({from: accounts[0]});
      this.retreiveAndUpdateContractDetails(this.state.address);
    }catch(error){
      console.log('error occurred!!', error);
    }
  }

renderBidderInformation(){
    return this.state.biddersInfo.map((data, index) => {
          return <InsurerRow
                  bidderAddress={data.bidderAddress}
                  showCancelButton = {data.showCancelButton}
                  amount={data.amount}
                  key={index}
                  bidderChoosen={data.bidderChoosen}
                  cancelBid = {this.cancelBid}
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
    const colorProp = {color:'#EB593C'};
    const colSize = bidderChoosen ? 10 : 7;
    return(
      <div style={{backgroundColor:'#b2cecf', width:'100%', height:'635px'}}>
        <Layout>
          <Grid color='teal'>
            <Grid.Row>
              <Grid.Column  width={9}/>
              <Grid.Column width={7} textAlign='right'>
                <Input
                  value={this.state.searchAddress}
                  onChange={(event) => {this.setState({searchAddress: event.target.value})}}
                  size='medium' placeholder='Enter Contract Address'
                  />
                <Button
                  content='Search'
                  icon="search"
                  color='youtube'
                  size='medium'
                  loading={this.state.loading}
                  onClick={this.searchContractDetails} floated='right'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

            {!this.state.contractNotFoundMessage &&
              <center style={{marginTop:'2px', marginBottom:'2px'}}>
                <Label pointing='below' color='red'>
                  INSURER/BIDDER PAGE: Details Of {this.state.contractDetails.description}
                </Label>
              </center>
            }

          <Grid>
            <Grid.Row>
              <Grid.Column>
                {this.renderContractDetails()}
              </Grid.Column>
            </Grid.Row>
            <Divider/>
          </Grid>

          {!this.state.contractNotFoundMessage &&
            <div>
            <Grid celled columns={2} divided relaxed >
              <Grid.Row>
                {!bidderChoosen &&
                    <Grid.Column width={6} container='true'>
                          <BidOnContract bidOnContract={this.bidOnContract} coverageAmount={this.state.coverageAmount}/>
                    </Grid.Column>
                  }
              {bidInfoAvailable &&
                <Grid.Column width={colSize} container='true'>
                  {bidderChoosen &&
                      <div>
                        <Label color="red" pointing='below' size='small'>
                          Following Insurer has been choosen by Contract Owner
                        </Label>
                      </div>
                    }

                  {!bidderChoosen &&
                      <div>
                        <Label color="red" pointing='below' size='small'>
                          Following Quotes are provided by different Insurer!!
                        </Label>
                      </div>
                    }

                    <Table textAlign='center' size='small' striped compact celled selectable>
                          <Table.Header>
                            <Table.Row >
                              <Table.HeaderCell>
                                <span style={colorProp}>Address Of Insurer</span>
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <span style={colorProp}>Quote/Premium</span>
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <span style={colorProp}>Bid</span>
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {this.renderBidderInformation()}
                          </Table.Body>
                        </Table>
                </Grid.Column>
              }
            </Grid.Row>
          </Grid>
          </div>
          }
        </Layout>
      </div>
    );
  }
}

export default ViewContractInsurer;
