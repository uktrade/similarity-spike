import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getScoreColour } from '../utils';


export class StripeyList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    }
  }

  selectCell = (item) => {
    this.setState({ selectedItem: item });
    this.props.selectItem(item);
  };

  render() {

    if (!this.props.items || this.props.items.length === 0) {
      return (<p>...Loading</p>);
    }

    const Cell = this.props.cell || PlainCell;

    const itemElements = this.props.items.map((item, index) => {
      const selected = (item === this.state.selectedItem);
      return <Cell key={index} item={item} selected={selected} selectItem={() => this.selectCell(item)}/>;
    });

    return ( <ol className="stripey-col-list">{ itemElements }</ol>);
  }

}

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
