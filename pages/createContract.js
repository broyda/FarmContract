import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import {Form, Input, Container, Grid, Button, Label, Card, Divider, Message} from 'semantic-ui-react';
import {Link, Router} from '../routes';

class CreateContract extends Component{
  constructor(props){
      super(props);
      this.state ={
              longitude:'',
              lattitude:'',
              coverageAmount:'',
              listedPrice:'',
              description:'',
              loading: false,address:'',
               errorMessage:''
            };
  }

  componentDidMount(){
    this.loadGeoMap();
  }

  componentDidUpdate(){
      //this.loadGeoMap();
  }

 createContract = async (event) =>{
  const {longitude, lattitude, coverageAmount,listedPrice, description} = this.state;
   if(longitude && lattitude && coverageAmount && listedPrice && description){
     this.setState({loading: true, errorMessage:''});
     event.preventDefault();
     try{
       const accounts = await web3.eth.getAccounts();
       await factory.methods.createFarmContract(lattitude + '',longitude +'', coverageAmount,
       listedPrice, description).send({from: accounts[0]});
       const addr = await factory.methods.contractAddressMap(accounts[0]).call();
       this.setState({address: addr, loading: false});
       //We can remove above line and route to list of available contracts page by
       //un commenting below line of code!!.
       //Router.pushRoute('/contractListOwner');
     }
     catch(error){
       console.log(error);
       this.setState({ loading: false, errorMessage:error.message});
     }
   }
   else{
     this.setState({errorMessage: 'Missing Required Information. Please verify it.'});
   }

  }

  loadCreatedContract = () =>{
    return (
      <div>
            <Link route={`/viewContractOwner/${this.state.address}`}>
                <a>
                  <Label color='grey' size='medium'> Contract Created successfully. {this.state.address} <u>VIEW DETAILS HERE</u></Label>
                </a>
            </Link>
      </div>
      );
  }

  loadGeoMap = () => {
      var mapOptions = {
                 center: new google.maps.LatLng(41.8781, -87.6298),
                 zoom: 10,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             };
             var infoWindow = new google.maps.InfoWindow();
             var latlngbounds = new google.maps.LatLngBounds();
             var map = new google.maps.Map(document.getElementById("geoMap"), mapOptions);

             map.addListener('click', (function(event) {
                  this.setState({
                    lattitude:event.latLng.lat(),
                    longitude: event.latLng.lng()
                  });
                }).bind(this));
}

  render(){
    return(
        <div style={{backgroundColor:'#FFE361', width:'100%', height:'635px'}}>
          <Layout>
          <Container style={{marginTop:'10px'}}>
            <div>
                <Form onSubmit={this.createContract} error={!!this.state.errorMessage}>
                  <Grid stackable container>
                    <Grid.Row>
                    <Grid.Column textAlign='center' width={3} verticalAlign='middle'>
                        <Label pointing='right' color='orange' size="medium">Choose Location of your FARM:</Label>
                    </Grid.Column>
                      <Grid.Column width={7}>
                        <div
                          id="geoMap"
                          style={{width: '650px', height: '200px'}}
                          />
                      </Grid.Column>
                    </Grid.Row>

                    { this.state.lattitude && this.state.longitude &&
                      <Grid.Row>
                        <Grid.Column textAlign='center'>
                          <Label color='orange'>Choosen Lattitude and Longitude values are <u> {this.state.lattitude} , {this.state.longitude} </u></Label>
                        </Grid.Column>
                      </Grid.Row>
                    }

                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Label pointing='right' color='grey'>Coverage Amount</Label>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Form.Field>
                          <Input
                            value={this.state.coverageAmount}
                            label='Wei'
                            labelPosition='right'
                            placeholder='Enter Coverage Amount here'
                            onChange={(event) => this.setState({coverageAmount: event.target.value})}
                            />
                        </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Label pointing='right' color='grey'>Listing Price</Label>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Form.Field>
                          <Input
                            value={this.state.listedPrice}
                            label='Wei'
                            labelPosition='right'
                            placeholder='Amount Ready to pay for Contract'
                            onChange={(event) => this.setState({listedPrice: event.target.value})}
                            />
                        </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Label pointing='right' color='grey'>Contract Description</Label>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Form.Field>
                          <Input
                            value={this.state.description}
                            placeholder='Description of the contract'
                            onChange={(event) => this.setState({description: event.target.value})}
                            />
                        </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    { this.state.address &&
                      <Grid.Row>
                        <Grid.Column textAlign='center'>
                          {this.loadCreatedContract()}
                        </Grid.Column>
                      </Grid.Row>
                     }
                    <Grid.Row>
                      <Grid.Column textAlign='center'>
                          <Message error header='Sorry there was an error occurred!' content={this.state.errorMessage}/>
                          <Button loading={this.state.loading}  size='small' color='orange'>CREATE CONTRACT</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
            </div>
          </Container>
          </Layout>
        </div>
    );
  }
}
export default CreateContract;
