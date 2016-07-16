import axios from 'axios';
import { GET_COMPANY, GET_COMPANIES, GET_OPPORTUNITY } from './actiontypes';


export function selectCompany(company) {
  console.log('select company:', company);
  return {
    type: GET_COMPANY,
    payload: company
  }
}


export function getCompaniesForOpportunity(opportunity) {

  return function(dispatch) {
    dispatch({
      type: GET_OPPORTUNITY,
      payload: opportunity
    });

    dispatch({
      type: GET_COMPANIES,
      payload: []
    });

    dispatch({
      type: GET_COMPANY,
      payload: null
    });

    axios.post('/opp-cos', {
      opp: opportunity.desc
    })
    .then((response) => {
      dispatch({
        type: GET_COMPANIES,
        payload: response.data
      });
    });
  }
}
