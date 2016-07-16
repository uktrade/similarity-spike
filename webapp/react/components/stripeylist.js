import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getScoreColour } from '../utils';


export const StripeyList = props => {
  if (!props.items.all || props.items.all.length === 0) {
    return (<p>...Loading</p>);
  }

  const items = props.sort ? props.items.all.sort(props.sort) : props.items.all;
  const Cell = props.cell || PlainCell;

  const itemElements = items.map((item, index) => {
    const selected = (item === props.items.selected);
    return <Cell key={index} item={item} selected={selected} selectItem={() => props.selectItem(item)}/>;
  });

  return ( <ol className="stripey-col-list">{ itemElements }</ol>);
};

StripeyList.propTypes = {
  items: React.PropTypes.object,
  sort: React.PropTypes.func,
  selectItem: React.PropTypes.func
};


export const ScoreCell = props => {

  const score  = props.item.score || 0;
  const scoreColour = getScoreColour(score);
  const style = {
    borderLeftColor: scoreColour,
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid'
  };

  let className = 'stripey-col-list__item';
  if (props.selected) {
    className += ' stripey-col-list__item--active';
  }

  return (
    <li className={ className } style={style}>
      <a onClick={() => props.selectItem(props.item)}>{ props.item.name }</a>
    </li>);
};

ScoreCell.propTypes = {
  selected: React.PropTypes.bool,
  item: React.PropTypes.object
};


export const PlainCell = props => {

  let className = 'stripey-col-list__item';
  if (props.selected) {
    className += ' stripey-col-list__item--active';
  }

  return (
    <li className={ className }>
      <a onClick={() => props.selectItem(props.item)}>{ props.item.name }</a>
    </li>);
};

PlainCell.propTypes = {
  selected: React.PropTypes.bool,
  item: React.PropTypes.object
};
