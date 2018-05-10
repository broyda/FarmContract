import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';

export default (props) => {
  return(
    <Table.Row>
      <Table.Cell>
        {props.bidderAddress}
      </Table.Cell>
      <Table.Cell>
        {props.amount} in Wei
      </Table.Cell>
    </Table.Row>
  );
}
