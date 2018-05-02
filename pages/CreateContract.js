import React, {Component} from 'react';
import Layout from '../Components/LayoutComponent';
import factoryContractObj from '../ethereum/factory';
import {Form, Input, Container, Grid, Button, Label} from 'semantic-ui-react';

class CreateContract extends Component{
  constructor(props){
      super(props);
      this.state ={
              longitude:'',
              lattitude:'',
              coverageAmount:'',
              listedPrice:'',
              loading: false
      };
  }
  static async getInitialProps(props) {
    const address = factoryContractObj.options.address;
    console.log(address);
    return {address};
  }
 createContract = (event) =>{
   this.setState({loading: true});
    event.preventDefault();
    console.log('creating contract!!!!');
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
      <Container style={{marginTop:'20px'}}>
        <div>
            <Form onSubmit={this.createContract}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Label pointing='below'>Choose Cordinates of your FARM:</Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <div
                      id="geoMap"
                      style={{width: '650px', height: '250px'}}
                      onClick={(event) => this.selectCordinates(event)}
                      />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={4}>
                    <Label pointing='right'>Coverage Amount</Label>
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <Form.Field>
                      <Input
                        value={this.state.coverageAmount}
                        label='ether'
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
                        label='ether'
                        labelPosition='right'
                        placeholder='Amount Ready to pay for Contract'
                        onChange={(event) => this.setState({listedPrice: event.target.value})}
                        />
                    </Form.Field>
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Button loading={this.state.loading} primary>Create Contract</Button>
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
