import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

export default (props) => {
  return(
    <Table.Row>
      <Table.Cell>
        {props.item.address}
      </Table.Cell>
      <Table.Cell>
        {props.item.description}
      </Table.Cell>
      <Table.Cell>
        {props.item.numberOfBidders}
      </Table.Cell>
      <Table.Cell>
       Click Here!
      </Table.Cell>
    </Table.Row>
  );
}
