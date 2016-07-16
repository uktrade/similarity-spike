import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export const Company = props => {
  return (
    <div>
      <h3 className="heading-medium">{ props.company.name }</h3>
      <p>{ props.company.desc }</p>
    </div>
  );
};

Company.propTypes = {
  company: React.PropTypes.object,
  selectOpportunity: React.PropTypes.func
};
