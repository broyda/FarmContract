import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

class DisplayContractDetails extends Component{
  render(){
    const {owner,coordinates, coverageAmtAndContractBalance, listedPrice, description,
       bidders, contractBalance} = this.props.contractDetails;
    const items = [
      {
        header: 'Address of Owner',
        description: owner,
        style: {overflowWrap: 'break-word'}
      },
      {
        header: 'Geographical Information',
        description:coordinates ,
        style: {overflowWrap: 'break-word'}
      },
        {
          header: 'Coverage Amount And Balance',
          description: `${coverageAmtAndContractBalance} Wei`,
          style: {overflowWrap: 'break-word'}
        },
        {
          header: 'Listed Price',
          description: `${listedPrice} Wei`,
          style: {overflowWrap: 'break-word'}
        },
        {
          header: 'Contracts Address',
          description: description,
          style: {overflowWrap: 'break-word'}
        },
        {
          header: 'Number of Bidders',
          description: bidders,
          style: {overflowWrap: 'break-word'}
        }
  ]
    return(<Card.Group items={items}/>);
  }
}

export default DisplayContractDetails;
