import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCompanies, setCurrentCompany, setCurrentOpportunity } from '../actions';

function createDetailMarkup(opp) {
  return { __html: opp.replace(/(?:\r\n|\r|\n)/g, '<br /><br />') };
}

function getScoreColour (opp) {
  return "hsl(" + opp.score * 500 + ", 100%, 50%)";
}

class CompanyList extends Component {

  componentWillMount() {
    this.props.getCompanies();
  }

  render() {
    const companies = this.props.companies.all;

    if (companies.length === 0) {
      return (<p>...Loading</p>);
    }

    let companiesList = companies.map((company, index) => {
      return (
        <li className="results-list__result" key={index}>
          <a onClick={() => this.props.setCurrentCompany(company)}>{ company.name }</a></li>
      );
    });

    let oppList;
    if (this.props.opportunities.all.length === 0) {
      oppList = <p>...Loading</p>;
    } else {
      oppList = this.props.opportunities.all.map((opportunity, key) => {
        let scoreColour = getScoreColour(opportunity);
        let style = {
          borderLeftColor: scoreColour,
          borderLeftWidth: '5px',
          borderLeftStyle: 'solid'
        };

        return (
          <div key={key} className='opportunity' style={style}
               onClick={() => this.props.setCurrentOpportunity(opportunity)}>
            {opportunity.name}
          </div>
        );
      });
    }

    let style;

    if (this.props.opportunities.currentOpportunity) {
      let scoreColour = getScoreColour(this.props.opportunities.currentOpportunity);
      style = {
        background: scoreColour,
        width: '60px',
        height: '60px',
        borderRadius: '60px',
        textAlign: 'center',
        display: 'table-cell',
        overflow: 'hidden',
        verticalAlign: 'middle',
        clear: 'both'
      }
    }

    return (
      <div>
        <div className="col">
          <ol className="company-list">{ companiesList }</ol>
        </div>
        <div className="col">
          { this.props.companies.currentCompany &&
            <div>
              <div className="current-company">
                <h3 className="heading-medium">{ this.props.companies.currentCompany.name }</h3>
                <p>{ this.props.companies.currentCompany.desc }</p>
              </div>
              <h3 className="heading-small">Opportunities</h3>
              <div className="opportunities">{ oppList }</div>
            </div>
          }
        </div>
        <div className="col">

          { (this.props.opportunities.currentOpportunity) &&
            <div>
              <div className="right">
                <div className="score" style={style}>{this.props.opportunities.currentOpportunity.score.toFixed(2)}</div>
              </div>
              <div
                className="opportunity-detail"
                dangerouslySetInnerHTML={ createDetailMarkup(this.props.opportunities.currentOpportunity.desc) }
              />
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

export default connect(mapStateToProps, { getCompanies, setCurrentCompany, setCurrentOpportunity })(CompanyList);
