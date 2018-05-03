import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import farmFactory from '../ethereum/farmFactory';
import web3 from '../ethereum/web3';
import {Grid, Card, Label, Header, Divider, Button, Input} from 'semantic-ui-react';

class ViewContract extends Component{
  static async getInitialProps(props){
    console.log('address is not blank');
    const address = props.query.address;
    if(address){
      const accounts = await web3.eth.getAccounts();
      const farmFactoryObj = farmFactory(address);
      const contractDetails = await farmFactoryObj.methods.getFarmContractDetails().call();
      return{
        address: address,
        owner: contractDetails[0],
        coordinates: `Lattitide - ${contractDetails[1]} & Langitude - ${contractDetails[2]}`,
        coverageAmount: contractDetails[3],
        listedPrice: contractDetails[4],
        description: contractDetails[5],
        bidders: contractDetails[6]
      };
    }else{
      console.log('address is blank');
      return{};
    }
  }

  displayContractDetails(){
    if(this.props.address){
      const {owner,coordinates, coverageAmount, listedPrice, description, bidders} = this.props;
      const items = [
        {
          header: owner,
          meta:'Owner',
          description: 'Owner of the Contract!',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: coordinates,
          meta:'Coardinates',
          description: 'Farm Lattitude and Longitude information',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: coverageAmount,
          meta:'Coverage Amount',
          description: 'Contract Coverage amount',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: listedPrice,
          meta:'Listed price',
          description: 'Price ready to be Paid by Contract Owner',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: description,
          meta:'Contract Information',
          description: 'Breif Description of the Contract',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: bidders,
          meta:'Bidders',
          description: 'Number of Bidders on this Contract',
          style: {overflowWrap: 'break-word'}
        }
    ]
    return <Card.Group items={items}/>
    }else{
      return <center><Label color='red'>No Contract details Found!!!!!</Label></center>;
    }
  }
  render(){
    return(
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <Divider horizontal>FARM CONTRACT DEATILS PAGE!!</Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.displayContractDetails()}
            </Grid.Column>

            {this.props.address &&
              <Grid.Column width={6}>
                    <Input
                      placeholder='Bidding amount!'
                      label='either'
                      labelPosition='right'
                      />
                    <br/>
                    <br/>
                    <Button primary >Bid on this Contract!</Button>
              </Grid.Column> }

          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ViewContract;
