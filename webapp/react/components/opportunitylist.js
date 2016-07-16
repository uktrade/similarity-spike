import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCompaniesForOpportunity, selectCompany } from '../actions/opportunitylistactions';
import { StripeyList, ScoreCell } from './stripeylist';
import { Company } from './company';



class OpportunityList extends Component {

  render() {

    return (
      <div>
        <div className="col">
          <h2 className="heading-medium">Opportunities</h2>
          <StripeyList items={this.props.opportunities.dummyOpps} selectItem={this.props.getCompaniesForOpportunity}/>
        </div>
        <div className="col">
          { this.props.companies.all.length > 0 &&
            <div>
              <h3 className="heading-small col__section col__section--heading">
                Matching companies</h3>
              <StripeyList
                items={ this.props.companies.all }
                selectItem={ this.props.selectCompany }
                cell={ScoreCell}
              />
            </div>
          }
        </div>
        <div className="col">
          { (this.props.companies.currentCompany) &&
            <div className="col__section col__section--dark">
              <Company company={this.props.companies.currentCompany} />
            </div>
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps({ companies, opportunities }) {
  return { companies, opportunities };
}

export default connect(mapStateToProps, { getCompaniesForOpportunity, selectCompany })(OpportunityList);
