import React, {Component} from 'react';
import factoryContractObj from '../ethereum/factory';
import Layout from '../LayoutComponent';
import {Form, Input, Container, Grid, Button} from 'semantic-ui-react';

class FarmContractIndex extends Component{
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
  render(){
    return(
      <Layout>
        <Container style={{marginTop:'20px'}}>
          <div>
              <Form onSubmit={this.createContract}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <label>Longitude</label>
                    </Grid.Column>

                    <Grid.Column width={7}>
                      <Form.Field>
                        <Input
                          value={this.state.longitude}
                          placeholder='Enter longitude here'
                          onChange={(event) => this.setState({longitude: event.target.value})}
                          />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}>
                      <label>Lattitude</label>
                    </Grid.Column>

                    <Grid.Column width={7}>
                      <Form.Field>
                        <Input
                          value={this.state.lattitude}
                          placeholder='Enter Lattitude here'
                          onChange={(event) => this.setState({lattitude: event.target.value})}
                          />
                      </Form.Field>
                  </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}>
                      <label>Coverage Amount</label>
                    </Grid.Column>

                    <Grid.Column width={7}>
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
                    <Grid.Column width={3}>
                      <label>Listing Price</label>
                    </Grid.Column>

                    <Grid.Column width={7}>
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

export default FarmContractIndex;
