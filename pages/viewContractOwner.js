import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import web3 from '../ethereum/web3';
import {Grid, Card, Label, Header, Divider, Button, Input, Table, Message} from 'semantic-ui-react';
import DisplayContractDetails from '../Components/DisplayContractDetails';
import BiddingRow from '../Components/BiddingRow';

class ViewContract extends Component{
  constructor(props){
    super(props);
    this.state={
      address: this.props.address,
      contractDetails: this.props.details,
      coverageAmount: this.props.coverageAmount,
      searchAddress:'',
      seachLoading: false,
      contractNotFoundMessage:this.props.contractNotFoundMessage,
      biddersInfo: this.props.biddersInfo,
      bidderChoosen: this.props.bidderChoosen,
      transferAddress:'',
      transferButtonLoading: false,
      accountBalance:''
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
                             return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false});
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
      this.setState({seachLoading: true});
      this.retreiveAndUpdateContractDetails(this.state.searchAddress);
    }
  };

retreiveAndUpdateContractDetails = async (address) => {
  try{
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
          .map( async (element, index) => {
            const bidderAddress = await searchFarmObj.methods.biddersAddressArray(index).call();
            const amount = await searchFarmObj.methods.listOfBidders(bidderAddress).call();
            const bidder = await searchFarmObj.methods.insurer().call();
            return({bidderAddress: bidderAddress, amount: amount, bidderChoosen: false});
          })
        );
    }
    const contractBalance = await searchFarmObj.methods.contractBalance().call();
    const details ={owner: farmDetails[0],
                    coordinates: `Lattitide - ${farmDetails[1]} & Langitude - ${farmDetails[2]}`,
                    coverageAmtAndContractBalance: `${farmDetails[3]}, ${contractBalance}`,
                    listedPrice: farmDetails[4],
                    description: farmDetails[5],
                    bidders: numberOfBidders
                  };

    this.setState({
      address: address,
      seachLoading: false,
      coverageAmount: farmDetails[3],
      contractDetails: details,
      biddersInfo: biddersInfo,
      contractNotFoundMessage:'',
      bidderChoosen: bidderChoosen
    });
  }catch(error){
    console.log('inside catch block', error);
    this.setState({contractNotFoundMessage: 'No details found!. Please verify search criteria.', seachLoading: false});
  }
};

chooseBidder = async (address, amount) => {
      try{
        const accounts = await web3.eth.getAccounts();
        const contractObj = farmFactory(this.state.address);
        await contractObj.methods.chooseBidder(address).send({from: accounts[0], value: amount});
        this.retreiveAndUpdateContractDetails(this.state.address);
      }catch(error){
        console.log('error occured inside chooseBidder', error);
      }
    }

transferContract = async (address) => {
          try{
            this.setState({transferButtonLoading: true});
            const accounts = await web3.eth.getAccounts();
            const contractObj = farmFactory(this.state.address);
            await contractObj.methods.transferContract(address).send({from: accounts[0]});
            this.retreiveAndUpdateContractDetails(this.state.address);
          }catch(error){
            console.log('error occured inside chooseBidder', error);
          }
          this.setState({transferButtonLoading: false});
        }

  renderContractDetails(){
    if(!this.state.contractNotFoundMessage){
      return <DisplayContractDetails contractDetails={this.state.contractDetails} contractAddress={this.state.address}/>
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

  renderBidderInformation(){
      return this.state.biddersInfo.map((data, index) => {
                return <BiddingRow bidderAddress={data.bidderAddress}
                        amount={data.amount}
                        key={index}
                        bidderChoosen={data.bidderChoosen}
                        chooseBidder={this.chooseBidder}
                        />;
                    })
        };

  componentDidMount(){
    this.getAccountBalance();
  }

  getAccountBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const amountInEther = await web3.utils.fromWei(balance, 'ether');
    this.setState({accountBalance: amountInEther});
  }

  render(){
    const {bidderChoosen, biddersInfo, contractNotFoundMessage} = this.state;
    const bidderInfoAvailable = biddersInfo && biddersInfo !== null
        && typeof biddersInfo !== 'undefined' && biddersInfo.length > 0;
    const style = {color:'#d02552', fontWeight: 'bolder'};
    const colorProp = {color:'#EB593C'};
    return(
        <div style={{backgroundColor:'#FFE361', width:'100%', height:'700px'}}>
          <Layout>
            <div style={{backgroundColor:''}}>
              <Grid celled padded>
                <Grid.Row>
                  <Grid.Column  width={6}>
                    <Label color='orange'>Your Account Balance is {this.state.accountBalance} ether</Label>
                  </Grid.Column>
                  <Grid.Column width={10} textAlign='right'>
                    <Input
                      value={this.state.searchAddress}
                      onChange={(event) => {this.setState({searchAddress: event.target.value})}}
                      size='medium' placeholder='Enter Contract Address' focus
                      />
                    <Button content='Search'
                      icon="search"
                      color='orange'
                      loading={this.state.seachLoading}
                      onClick={this.searchContractDetails} floated='right'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            {!contractNotFoundMessage &&
              <center style={{marginTop:'10px'}}>
                <Label pointing='below' color="grey" size='medium'>
                  CONTRACT OWNER: Details OF {this.state.contractDetails.description} CONTRACT
                </Label>
              </center>
            }

              <Grid celled padded>
                <Grid.Row>
                  <Grid.Column>
                    {this.renderContractDetails()}
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              {!contractNotFoundMessage &&
                <div >
                    <Grid celled padded>
                    <Grid.Row>
                      <Grid.Column container='true'>
                      {!bidderChoosen && bidderInfoAvailable &&
                        <center style={{marginBottom:'2px', marginTop:'4px'}}><Label pointing='below' color="grey" size='medium'>
                            Insurers/Bidders Information</Label>
                        </center>
                      }

                      {bidderChoosen &&
                        <center style={{marginBottom:'2px', marginTop:'4px'}}>
                          <Label color="grey" pointing='below' size='medium' color="grey">Following Insurer has been choosen.</Label>
                        </center>
                      }

                      {bidderInfoAvailable &&
                        <div>
                          <Table textAlign='center' size='small' striped compact celled selectable>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  <span style={colorProp}>Address Of Bidder</span>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  <span style={colorProp}>Quote/Premium</span>
                                </Table.HeaderCell>
                                {!bidderChoosen &&
                                  <Table.HeaderCell>
                                    <span style={colorProp}>Choose Bidder</span>
                                  </Table.HeaderCell>
                                 }
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderBidderInformation()}
                            </Table.Body>
                          </Table>
                        </div>
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <center style={{marginBottom:'2px', marginTop:'10px'}}>
                  <Label color="grey" pointing='below' size='large' color="grey">Contract Services</Label>
                </center>

                <div style={{backgroundColor:''}}>
                  <Grid celled padded>
                    <Grid.Row>
                      <Grid.Column width={8} textAlign='right'>
                          <Input
                            value={this.state.transferAddress}
                            onChange={(event) => this.setState({transferAddress: event.target.value})}
                            placeholder='Address to be Transferred'
                            label='Address'
                            labelPosition='right'
                          />
                          <Button
                            color = 'orange'
                            floated='right'
                            loading={this.state.transferButtonLoading}
                            disabled={false}
                            onClick={() => this.transferContract(this.state.transferAddress)}
                           >Transfer Contract</Button>
                      </Grid.Column>
                      {bidderChoosen &&
                        <Grid.Column width={6} textAlign='right'>
                          <Label pointing='right'>Click HERE to Process CLAIM</Label>
                            <Button
                              color = 'orange'
                              loading={this.state.transferButtonLoading}
                              disabled={false}
                              onClick={() => this.transferContract(this.state.transferAddress)}
                             >Process Claim</Button>
                        </Grid.Column>
                      }

                    </Grid.Row>
                    </Grid>
                </div>
                </div>
                }
          </Layout>
        </div>
    );
  }
}

export default ViewContract;
