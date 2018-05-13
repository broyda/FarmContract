import React, {Component} from 'react';
import {Input, Button, Label, Divider} from 'semantic-ui-react';

class BidOnContract extends Component{
  constructor(props){
    super(props);
    this.state={
          loading:false,
          bidAmount:''
        }
  }

  clickOnBidContract = async () => {
    this.setState({loading: true});
    await this.props.bidOnContract(this.state.bidAmount);
    this.setState({loading: false});
  }

  render(){
    return(
      <div>
        <Input
          value={this.props.bidAmount}
          onChange={(event) => this.setState({bidAmount: event.target.value})}
          placeholder='Bidding amount!'
          label='wei'
          labelPosition='right'
        />
        <Button
          color='grey'
          loading={this.state.loading}
          onClick={this.clickOnBidContract}
          floated='right' compact>Bid This Contract
        </Button>
        <div style={{marginTop:'5px'}}>
            <Label color='grey' pointing='above'>You need to transfer {this.props.coverageAmount} Wei to Bid on this Contract!</Label>
        </div>
        <Divider/>
      </div>
    );
  }
}

export default BidOnContract;
