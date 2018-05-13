import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Link} from '../routes';

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
        <Link route={`/viewContractOwner/${props.item.address}`}>
          <a style={{color: '#BD3632'}}>View Contract!</a>
        </Link>

      </Table.Cell>
    </Table.Row>
  );
}
