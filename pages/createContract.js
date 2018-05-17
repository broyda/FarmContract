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

 createContract = async (event) =>{
   this.setState({loading: true, errorMessage:''});
   event.preventDefault();
   try{
     const {longitude, lattitude, coverageAmount,listedPrice, description} = this.state;
     const accounts = await web3.eth.getAccounts();
     await factory.methods.createFarmContract(lattitude + '',longitude +'', coverageAmount,
     listedPrice, description).send({from: accounts[0]});

     const addr = await factory.methods.contractAddressMap(accounts[0]).call();
     this.setState({address: addr, loading: false});
     //We can remove above line and route to list of available contracts page by
     //un commenting below line of code!!.
     //Router.pushRoute('/contractListOwner');
   }catch(error){
     console.log(error);
     this.setState({ loading: false, errorMessage:error.message});
   }
  }

  loadCreatedContract = () =>{
    if(this.state.address){
      return (
      <div>
          <h4>Contract Created successfully!!!! {this.state.address}
            <Link route={`/viewContractOwner/${this.state.address}`}>
                <a>
                <Label color='blue' pointing='left' size='tiny'> View Contract Details here</Label>
              </a>
            </Link>
          </h4>
      </div>
      );
    }
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
        <div style={{backgroundColor:'#b2cecf', width:'100%', height:'618px'}}>
          <Layout>
          <Container style={{marginTop:'10px'}}>
            <div>
                <Form onSubmit={this.createContract} error={!!this.state.errorMessage}>
                  <div style={{marginTop:'10px'}}/>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <center>
                          <Label pointing='below' color='red' size="medium">Choose Location of your FARM:</Label>
                        </center>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={3}>
                      </Grid.Column>
                      <Grid.Column width={7}>
                        <div
                          id="geoMap"
                          style={{width: '650px', height: '180px'}}
                          />
                      </Grid.Column>
                    </Grid.Row>
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
                    <Grid.Row>
                      <Grid.Column>
                        <center>
                          <Message error header='Sorry there was an error occurred!' content={this.state.errorMessage}/>
                          <Button loading={this.state.loading} color='red' size='small'>CREATE CONTRACT</Button>
                        </center>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        {this.loadCreatedContract()}
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
