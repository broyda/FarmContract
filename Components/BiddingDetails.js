import React, {Component} from 'react';
import {Table, Input, Button, Label} from 'semantic-ui-react';
import BiddingRow from './BiddingRow';

class BiddingDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      bidLoadingSpinner: false,
      biddingAmount:''
    }
  }
  renderBidderInformation(){
      if(typeof this.props.biddersInfo !== 'undefined'
          && this.props.biddersInfo !== '' && this.props.biddersInfo !== null){
            return this.props.biddersInfo.map((data, index) => {
                return <BiddingRow bidderAddress={data.bidderAddress}
                        amount={data.amount}
                        key={index}
                        bidderChoosen={data.bidderChoosen}
                        chooseBidder={this.props.chooseBidder}
                        chooseBidderSpinner={this.props.chooseBidderSpinner}
                        />;
                    })
              }
        };

onClickBidButton = async () => {
  this.setState({bidLoadingSpinner: true});
  await this.props.bidOnContract(this.state.biddingAmount);
  this.setState({bidLoadingSpinner: false});
}

  renderBidderInputAndButton(bidderChoosen){
    if(bidderChoosen){
        return (
            <Label color="blue" pointing='below' size='tiny'>Following Bidder has been choosen by Contract Owner</Label>
        );
        }
        else{
          return(
                <div>
                  <Input
                    value={this.state.biddingAmount}
                    onChange={(event) => this.setState({biddingAmount: event.target.value})}
                    placeholder='Bidding amount!'
                    label='wei'
                    labelPosition='right'
                  />
                  <Button
                    primary
                    loading={this.state.bidLoadingSpinner}
                    onClick={this.onClickBidButton}
                    floated='right' compact>Bid This Contract
                  </Button>
                </div>
            );
    }
  }

  render(){
    return(
      <div>
        {this.renderBidderInputAndButton(this.props.bidderChoosen)}
        { this.props.biddersInfo && this.props.biddersInfo.length > 0 &&
          <Table columns={3} textAlign='center' size='small' striped compact celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Address Of Bidder</Table.HeaderCell>
                <Table.HeaderCell>Amount Bidded</Table.HeaderCell>
                <Table.HeaderCell>Choose Bidder</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.renderBidderInformation()}
            </Table.Body>
          </Table>
        }
      </div>
    );
  }
}

export default BiddingDetails;
