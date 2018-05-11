import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';

class InsurerRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      laoding: false
    }
  }

  cancelBid = async () => {
      this.setState({loading: true});
      await this.props.cancelBid()
      this.setState({loading: false});
    }

  render(){
    return(
          <Table.Row>
              <Table.Cell>
                {this.props.bidderAddress}
              </Table.Cell>
              <Table.Cell>
                {this.props.amount} Wei
              </Table.Cell>
              <Table.Cell>
                <Button primary
                  disabled={!this.props.showCancelButton}
                  onClick={this.cancelBid}
                  loading={this.state.loading}
                  >Cancel</Button>
              </Table.Cell>
          </Table.Row>
    );
  }
}

export default InsurerRow;
