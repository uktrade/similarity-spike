import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getScoreColour } from '../utils';


export const Badge = props => {

  const scoreColour = getScoreColour(props.value);
  const style = {
    backgroundColor: scoreColour
  };

  return (
   <div className="badge badge--right" style={style}>
    {(props.value * 100).toFixed(0)}
   </div>
  );
};

Badge.propTypes = {
  value: React.PropTypes.number
};
