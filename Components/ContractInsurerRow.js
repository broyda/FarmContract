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
        {props.item.coverageAmount}
      </Table.Cell>
      <Table.Cell>
        {props.item.listedPrice}
      </Table.Cell>
      <Table.Cell>
        <Link route={`/viewContractInsurer/${props.item.address}`}>
          <a style={{color: '#BD3632'}}><u>View Contract</u></a>
        </Link>

      </Table.Cell>
    </Table.Row>
  );
}
