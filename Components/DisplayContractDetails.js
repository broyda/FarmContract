import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

class DisplayContractDetails extends Component{
  render(){
    const {owner,coordinates, coverageAmount, listedPrice, description, bidders} = this.props.contractDetails;
    const items = [
      {
        header: owner,
        meta:'Owner',
        description: 'Owner of the Contract!',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: coordinates,
        meta:'Coardinates',
        description: 'Farm Lattitude and Longitude information',
        style: {overflowWrap: 'break-word'}
      },
        {
          header: coverageAmount,
          meta:'Coverage Amount',
          description: 'Contract Coverage amount in wei',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: listedPrice,
          meta:'Listed price in wei',
          description: 'Price ready to be Paid by Contract Owner',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: description,
          meta:'Contract Information',
          description: 'Breif Description of the Contract',
          style: {overflowWrap: 'break-word'}
        },
        {
          header: bidders,
          meta:'Bidders',
          description: 'Number of Bidders on this Contract',
          style: {overflowWrap: 'break-word'}
        }
  ]
    return(<Card.Group items={items} />);
  }
}

export default DisplayContractDetails;
