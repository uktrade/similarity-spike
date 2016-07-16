import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Badge } from './badge';


export const Company = props => {
  return (
    <div>
      { props.company.score &&
        <Badge value={props.company.score}/>
      }
      <h2 className="heading heading-medium">{ props.company.name }</h2>
      <p>{ props.company.desc }</p>
    </div>
  );
};

Company.propTypes = {
  company: React.PropTypes.object,
  selectOpportunity: React.PropTypes.func
};
