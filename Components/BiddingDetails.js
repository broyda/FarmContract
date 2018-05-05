import React, {Component} from 'react';
import {Table, Input, Button} from 'semantic-ui-react';

class BiddingDetails extends Component{
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
          <Table.Body >
            <Table.Row>
              <Table.Cell>0x93a11b102245c7097cd4c998d71e76fd8b0a7893</Table.Cell>
              <Table.Cell>120</Table.Cell>
              <Table.Cell><Button size='small' primary>Choose</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>0x93a11b102245c7097cd4c998d71e76fd8b0a7895</Table.Cell>
              <Table.Cell>180</Table.Cell>
              <Table.Cell><Button size='small' primary>Choose</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BiddingDetails;
