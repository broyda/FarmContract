import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';

class BiddingRow extends Component {
  constructor(props){
    super(props);
    this.state={
      chooseBidderSpinner: false
    }
  }

onClickOfChooseBidder = async () => {
    this.setState({chooseBidderSpinner: true});
    await this.props.chooseBidder(this.props.bidderAddress, this.props.amount)
    this.setState({chooseBidderSpinner: false});
  }
  render(){
    return(
        <Table.Row>
          <Table.Cell>
            {this.props.bidderAddress}
          </Table.Cell>
          <Table.Cell>
            {this.props.amount}
          </Table.Cell>

          {!this.props.bidderChoosen &&
            <Table.Cell>
              <Button
                size='small'
                loading={this.state.chooseBidderSpinner}
                onClick={this.onClickOfChooseBidder}
                primary
              >Choose</Button>
            </Table.Cell>
          }
        </Table.Row>
    );
  }
}

export default BiddingRow;
