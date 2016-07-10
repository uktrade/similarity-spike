import React, { Component } from 'react';
import { Link } from 'react-router'
import SearchBar from './searchbar';
import { connect } from 'react-redux';
import { getSuggestions, clearSuggestions } from '../actions';


class Homepage extends Component {

  componentWillMount() {
    this.props.clearSuggestions();
  }

  gotoCompany = (company) => {
    console.log(company);
    this.context.router.push(`/opportunities/${company}`);
  };

  render() {

    return (
      <form onSubmit={this.gotoCompany.bind(this)}>

        <div className="header-image--background"/>

        <img src="/images/greatbusiness-logo-small.png" className="header-image--logo" />

        <div className="black-panel">
          <h3 className="heading-medium">Find opportunities for your company</h3>
          <SearchBar suggestions = { this.props.suggestions }
                     getSuggestions = { this.props.getSuggestions }
                     onSearch = { this.gotoCompany }
                     label = 'Enter your company name'
                     clearSuggestions = {this.props.clearSuggestions}
          />
        </div>
      </form>

    );
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    suggestions: React.PropTypes.array,
    getCompanies: React.PropTypes.func,
    getSuggestions: React.PropTypes.func,
    clearSuggestions: React.PropTypes.func,
    router: React.PropTypes.func
  };
}


function mapStateToProps({ companies, suggestions }) {
  return { companies, suggestions };
}

export default connect(mapStateToProps, { getSuggestions, clearSuggestions })(Homepage);
