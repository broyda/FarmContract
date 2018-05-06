import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';

export default (props) => {
  return(
    <Table.Row disabled={props.bidderChoosen}>
      <Table.Cell>{props.bidderAddress}</Table.Cell>
      <Table.Cell>{props.amount}</Table.Cell>
      <Table.Cell><Button size='small' primary>Choose</Button></Table.Cell>
    </Table.Row>
  );
}
