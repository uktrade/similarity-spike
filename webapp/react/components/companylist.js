import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCompanies, setCurrentCompany, setCurrentOpportunity } from '../actions/companylistactions';
import { StripeyList, ScoreCell } from './stripeylist';
import { Company } from './company';
import { Opportunity } from './opportunity';
import { sortCompanies } from '../utils';


class CompanyList extends Component {

  componentWillMount() {
    this.props.getCompanies();
  }

  render() {

    return (
      <div>
        <div className="col">
          <h2 className="heading-medium">Companies</h2>
          <StripeyList items={this.props.companies} selectItem={this.props.setCurrentCompany} sort={sortCompanies} />
        </div>
        <div className="col">
          { this.props.companies.selected &&
            <div>
              <div className="col__section col__section--dark">
                <Company company={ this.props.companies.selected } />
              </div>
              <h3 className="heading-small col__section col__section--heading">Opportunities</h3>
              <StripeyList
                items={ this.props.opportunities }
                selectItem={ this.props.setCurrentOpportunity }
                cell={ScoreCell}
              />
            </div>
          }
        </div>
        <div className="col">
          { (this.props.opportunities.selected) &&
            <div className="col__section col__section--dark">
              <Opportunity opportunity={this.props.opportunities.selected} />
            </div>
          }
        </div>
      </div>
    );
  }

  static propTypes = {
    companies: React.PropTypes.object,
    opportunities: React.PropTypes.object,
    getCompanies: React.PropTypes.func,
    setCurrentCompany: React.PropTypes.func,
    setCurrentOpportunity: React.PropTypes.func
  }

}

function mapStateToProps({ companies, opportunities }) {
  return { companies, opportunities };
}

export default connect(mapStateToProps, { getCompanies, setCurrentCompany, setCurrentOpportunity })(CompanyList);
