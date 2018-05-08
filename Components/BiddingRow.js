import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';

export default (props) => {
  return(
    <Table.Row disabled={props.bidderChoosen}>
      <Table.Cell>
        {props.bidderAddress}
      </Table.Cell>
      <Table.Cell>
        {props.amount}
      </Table.Cell>

      {!props.bidderChoosen &&
        <Table.Cell>
          <Button
            size='small'
            loading={props.chooseBidderSpinner}
            onClick={() => props.chooseBidder(props.bidderAddress, props.amount)}
            primary
          >Choose</Button>
        </Table.Cell>
      }
      {props.bidderChoosen &&
        <Table.Cell positive>
          Accepted
        </Table.Cell>
      }
    </Table.Row>
  );
}
