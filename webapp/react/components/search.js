import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTerm } from '../actions';
import { Link } from 'react-router';
import SearchBar from './searchbar'


class Search extends Component {

  handleChange = (event) => {
    event.preventDefault();
    this.props.setTerm(event.target.value);
  };

  render() {

    let resultElements = this.props.searchResults.map((result, index) => {
      return (
        <li className="results-list__result" key={index}>
          <h3 className="result-title">
            <Link to={"company/" + result.name}>{ result.name }</Link>
          </h3>
          <p className="meta">{ result.desc }</p>
        </li>
      );
    });

    return (
      <div className="grid-row">
        <div className="column-two-thirds">
          <SearchBar searchTerm={this.props.searchTerm} setTerm={this.props.setTerm}/>

          {(this.props.searchResults.length > 0) &&
            <div>
              <div className="result-summary">Found { this.props.searchResults.length} results</div>
              <ol className="results-list">
                { resultElements }
              </ol>
            </div>
          }
        </div>
      </div>
    );
  }

  static propTypes = {
    searchResults: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    setTerm: React.PropTypes.func
  };
}


function mapStateToProps({ searchTerm, searchResults }) {
  return { searchTerm, searchResults };
}

export default connect(mapStateToProps, { setTerm })(Search);
