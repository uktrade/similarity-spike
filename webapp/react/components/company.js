import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';
import { getOpportunities, getCompany } from '../actions';

function getScoreColour (opp) {
  return "hsl(" + opp.score * 500 + ", 100%, 50%)";
}

class Opportunities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDetailIndex: 0
    }
  }

  componentWillMount() {
    this.props.getCompany(this.props.params.name);
    this.props.getOpportunities(this.props.params.name);
  }

  selectOpportunity = (index) => {
    this.setState({ currentDetailIndex: index });
  };

  renderOpportunities(opportunities) {

    const currentIndex = this.state.currentDetailIndex;
    const selectOpportunity = this.selectOpportunity;

    if (opportunities.length === 0) {
      return <div>Loading...</div>;
    }

    return opportunities.map((opportunity, index) => {

      let scoreColour = getScoreColour(opportunity);
      let style = {
        borderLeftColor: scoreColour,
        borderLeftWidth: '5px',
        borderLeftStyle: 'solid'
      };

      let classes = 'opportunity';

      if (index === currentIndex) {
        classes += ' opportunity--selected';
      }

      return (
        <li className={classes}
            key={index}
            onClick={ () => selectOpportunity(index) }
            style={style}
        >
          <div className="title">{ opportunity.title }</div>
        </li>
      );
    });

  }

  render() {
    const { opportunities, company } = this.props;

    if (!company) {
      return <div>Loading...</div>;
    }

    let currentOpp = opportunities[this.state.currentDetailIndex];
    let opportunityList = this.renderOpportunities(opportunities);

    function createDetailMarkup() {
      return { __html: currentOpp.desc.replace(/(?:\r\n|\r|\n)/g, '<br />') };
    }

    return (
      <div>
        <Link className="back-link" to="/">Back to search</Link>
        <h1 className="heading-large">{ company.name }</h1>
        <p>{ company.desc }</p>

        <hr/>
        <h2 className="heading-medium">Opportunities</h2>
        <div className="row">
          <div className="column-one-half column-one-half--full">
            <ul className="opportunities">
              { opportunityList }
            </ul>
          </div>
          <div className="column-one-half column-one-half--full">
            { currentOpp &&
            <div
              className="opportunity-detail"
              dangerouslySetInnerHTML={ createDetailMarkup() }
            />
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({opportunities, company}) {
  return { opportunities, company };
}

export default connect(mapStateToProps, { getOpportunities, getCompany })(Opportunities);
