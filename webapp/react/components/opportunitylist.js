import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCompaniesForOpportunity, selectCompany, clearSelectedOpportunity, getDummyOpps } from '../actions/opportunitylistactions';
import { StripeyList, ScoreCell } from './stripeylist';
import { Company } from './company';
import { scoreSort } from '../utils';


class OpportunityList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      searchedTerm: ''
    }
  }

  componentDidMount() {
    this.props.getDummyOpps();
  }

  onTermChange = (event) => {
    this.setState({...this.state, term: event.target.value});
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({...this.state, searchedTerm: this.state.term});
    this.props.clearSelectedOpportunity();
    this.props.getCompaniesForOpportunity({
      desc: this.state.term
    });

  };

  getCompanies = (opportunity) => {
    this.setState({term: '', searchedTerm: ''});
    this.props.getCompaniesForOpportunity(opportunity);
  };

  render() {
    return (
      <div>
        <div className="col">
          <form className="similarity-searchbar" onSubmit={this.submitForm}>
            <label className="similarity-searchbar__label">Search For Opportunities</label>
            <div className="similarity-searchbar__input-wrapper">
              <input
                className="similarity-searchbar__input form-control"
                id="search"
                name="search"
                value={this.state.term}
                autoComplete="off"
                onChange={this.onTermChange}
              />
              <button className="similarity-searchbar__submit" type="submit" value="Search"/>
            </div>
          </form>
          <h3 className="heading-small col__section col__section--heading">Example opportunities</h3>
          <StripeyList items={this.props.opportunities} selectItem={this.getCompanies}/>
        </div>
        <div className="col">
          {this.props.companies.all.length > 0 &&
            <div>
              <h3 className="heading-small col__section col__section--heading">
                Matching companies
                {this.state.searchedTerm.length > 0 &&
                  <span> for <span className="term-label">'{this.state.searchedTerm}'</span></span>
                }
              </h3>
              <StripeyList
                items={this.props.companies}
                selectItem={this.props.selectCompany}
                cell={ScoreCell}
                sort={scoreSort}
              />
            </div>
          }
        </div>
        <div className="col">
          { (this.props.companies.selected) &&
            <div className="col__section col__section--dark">
              <Company company={this.props.companies.selected} />
            </div>
          }
        </div>
      </div>
    );
  }

  static propTypes = {
    companies: React.PropTypes.object,
    opportunities: React.PropTypes.object,
    getCompaniesForOpportunity: React.PropTypes.func,
    selectCompany: React.PropTypes.func,
    clearSelectedOpportunity: React.PropTypes.func,
    getDummyOpps: React.PropTypes.func
  }
}

function mapStateToProps({ companies, opportunities }) {
  return { companies, opportunities };
}

export default connect(mapStateToProps, { getCompaniesForOpportunity, selectCompany, clearSelectedOpportunity, getDummyOpps })(OpportunityList);
