import React, {Component} from 'react';
import {Table, Input, Button} from 'semantic-ui-react';
import BiddingRow from './BiddingRow';

class BiddingDetails extends Component{
  renderBidderInformation(){
      if(typeof this.props.biddersInfo !== 'undefined'
        && this.props.biddersInfo !== ''
        && this.props.biddersInfo !== null){
      return this.props.biddersInfo.map((data, index) => {
        return <BiddingRow bidderAddress={data.bidderAddress}
          amount={data.amount}  key={index} bidderChoosen={data.bidderChoosen}/>;
      })
    }
  };

  render(){
    return(
      <div>
        <Input
        value={this.props.bidAmount}
        onChange={(event) => this.props.updateBiddingAmount(event)}
        placeholder='Bidding amount!'label='wei' labelPosition='right'
        />
        <Button
          primary
          loading={this.props.bidLoadingSpinner}
          onClick={this.props.bidOnContract}
          floated='right' compact>Bid This Contract
        </Button>
        <Table columns={3} textAlign='center' size='small'striped compact celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Address Of Bidder</Table.HeaderCell>
              <Table.HeaderCell>Amount Bidded</Table.HeaderCell>
              <Table.HeaderCell>Accept?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
              {this.renderBidderInformation()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BiddingDetails;
