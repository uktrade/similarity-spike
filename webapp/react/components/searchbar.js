import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTerm } from '../actions';
import { Link } from 'react-router';


export default class SearchBar extends Component {

  handleChange = (event) => {
    event.preventDefault();
    this.props.setTerm(event.target.value);
  };

  render() {
    return (
      <div className="similarity-searchbar">
        <label className="similarity-searchbar__label" htmlFor="search-query">Enter company name</label>
        <div className="similarity-searchbar__input-wrapper">
          <input className="similarity-searchbar__input form-control"
                 type="search"
                 value={ this.props.searchTerm }
                 onChange={ this.handleChange.bind(this) }
          />
          <input className="similarity-searchbar__submit" type="button" value="Search"/>
        </div>
      </div>
    );
  }

  static propTypes = {
    searchTerm: React.PropTypes.string,
    setTerm: React.PropTypes.func
  };
}
