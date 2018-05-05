import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import {Form, Input, Container, Grid, Button, Label, Card, Divider, Message} from 'semantic-ui-react';
import {Link} from '../routes';

class CreateContract extends Component{
  constructor(props){
      super(props);
      this.state ={
              longitude:'',lattitude:'',
              coverageAmount:'',listedPrice:'',
              description:'',
              loading: false,address:'', errorMessage:''
            };
  }

 createContract = async (event) =>{
   this.setState({loading: true, errorMessage:''});
   event.preventDefault();
   try{
     const {longitude, lattitude, coverageAmount,listedPrice, description} = this.state;
     const accounts = await web3.eth.getAccounts();
     await factory.methods.createFarmContract(lattitude,longitude, coverageAmount,
     listedPrice, description).send({from: accounts[0]});

     const addr = await factory.methods.contractAddressMap(accounts[0]).call();
     this.setState({address: addr, loading: false});
   }catch(error){
     console.log(error);
     this.setState({ loading: false, errorMessage:error.message});
   }
  }

  loadCreatedContract = () =>{
    if(this.state.address){
      return (
      <div>
          <Label pointing='right'>Contract Created successfully!!!! and number is {this.state.address}</Label>
            <Link route={`/view/${this.state.address}`}>
                <a>
                <Label color='teal'>View Contract Details here</Label>
              </a>
            </Link>
      </div>
      );
    }
  }

  loadGeoMap(){
      var mapOptions = {
                 center: new google.maps.LatLng(41.8781, -87.6298),
                 zoom: 10,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             };
             var infoWindow = new google.maps.InfoWindow();
             var latlngbounds = new google.maps.LatLngBounds();
             var map = new google.maps.Map(document.getElementById("geoMap"), mapOptions);
  }
  selectCordinates = (event) =>{
    event.preventDefault();
    console.log(event.target.type);
  }

  render(){
    return(
      <Layout>
      <Container style={{marginTop:'10px'}}>
        <div>
            <Form onSubmit={this.createContract} error={!!this.state.errorMessage}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Label pointing='below'>Choose Cordinates of your FARM:</Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                      <Label pointing='right'>Longitude</Label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                      <Form.Field>
                        <Input
                         value={this.state.longitude}
                         label='coardinates'
                         labelPosition='right'
                         onChange={(event) => this.setState({longitude: event.target.value})}
                        />
                      </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Label> Lattitude</Label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Input
                        value={this.state.lattitude}
                        label='coardinates'
                        labelPosition='right'
                        onChange={(event) => this.setState({lattitude: event.target.value})}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                   <Divider inverted />
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Label pointing='right'>Coverage Amount</Label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Input
                        value={this.state.coverageAmount}
                        label='wei'
                        labelPosition='right'
                        placeholder='Enter Coverage Amount here'
                        onChange={(event) => this.setState({coverageAmount: event.target.value})}
                        />
                    </Form.Field>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Label pointing='right'>Listing Price</Label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Input
                        value={this.state.listedPrice}
                        label='wei'
                        labelPosition='right'
                        placeholder='Amount Ready to pay for Contract'
                        onChange={(event) => this.setState({listedPrice: event.target.value})}
                        />
                    </Form.Field>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Label pointing='right'>Contract Description</Label>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Input
                        value={this.state.description}
                        label='wei'
                        labelPosition='right'
                        placeholder='Description of the contract'
                        onChange={(event) => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Message error header='Sorry there was an error occurred!' content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create Contract</Button>
                  </Grid.Column>
                </Grid.Row>
                   <Divider inverted />
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
    );
  }
}
export default CreateContract;
