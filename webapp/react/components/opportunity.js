import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Badge } from './badge';


function createDetailMarkup(text) {
  let markup = text.replace(/(?:\r\n|\r|\n)/g, '</p><p>');
  return { __html: `<p>${markup}</p>`  };
}




export const Opportunity = props => {

  if (!props.opportunity) {
    return <div>No Opportunity</div>
  }

  return (
    <div className="opportunity--detail">
      { props.opportunity.score &&
        <Badge value={props.opportunity.score}/>
      }
      <h2 className="heading heading-medium">Opportunity</h2>
      <div
        className="opportunity-detail"
        dangerouslySetInnerHTML={ createDetailMarkup(props.opportunity.desc) }
      />
    </div>
  );
};

Opportunity.propTypes = {
  opportunity: React.PropTypes.object
};
