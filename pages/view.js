import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import web3 from '../ethereum/web3';
import {Grid, Card, Label, Header, Divider, Button, Input} from 'semantic-ui-react';
import DisplayContractDetails from '../Components/DisplayContractDetails';

class ViewContract extends Component{
  constructor(props){
    super(props);
    this.state={
      address: this.props.address,
      contractDetails: this.props.details,
      searchAddress:'',
      loading: false
    }
}
  static async getInitialProps(props){
    const address = props.query.address;
    if(!address){
      return{};
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

  retreiveContractDetails = async (event) => {
    event.preventDefault();
    if(this.state.searchAddress){
      this.setState({loading: true});
      console.log(this.state.searchAddress);
      try{
          const accounts = await web3.eth.getAccounts();
          const searchFarmObj = await farmFactory(this.state.searchAddress);
          const farmDetails = await searchFarmObj.methods.getFarmContractDetails().call();
          console.log(farmDetails);
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
      }
      this.setState({loading: false});
    }
  };

  renderContractDetails(){
    if(this.state.address){
      return <DisplayContractDetails contractDetails={this.state.contractDetails}/>
    }else{
      return <center><Label color='red'>No Contract details Found!!!!!</Label></center>;
    }
  }

  render(){
    return(
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column  width={8}>
              <Divider horizontal inverted>FARM CONTRACT DEATILS PAGE!!</Divider>
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <Input
                value={this.state.searchAddress}
                onChange={(event) => {this.setState({searchAddress: event.target.value})}}
                size='medium' placeholder='Enter Contract Address'
                />
              <Button primary content='search'
                loading={this.state.loading}
                onClick={this.retreiveContractDetails}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderContractDetails()}
            </Grid.Column>

            {this.state.address &&
              <Grid.Column width={6}>
                <Input placeholder='Bidding amount!'label='either' labelPosition='right'/>
                    <br/><br/>
                <Button primary >Bid on this Contract!</Button>
              </Grid.Column> }
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewContract;
