import axios from 'axios';

import { GET_COMPANIES, GET_OPPORTUNITIES, GET_COMPANY, GET_OPPORTUNITY } from './actiontypes';

export function getCompanies() {
  return function(dispatch) {
    axios.get('/cos')
      .then((response) => {
        dispatch({
          type: GET_COMPANIES,
          payload: response.data
        });
      });
  };
}

export function setCurrentCompany(company) {
  return function(dispatch) {
    dispatch({
      type: GET_OPPORTUNITIES,
      payload: []
    });

    dispatch({
      type: GET_OPPORTUNITY,
      payload: null
    });

    dispatch({
      type: GET_COMPANY,
      payload: company
    });

    axios.post('/co-opps', {
      co: company.desc
    })
    .then((response) => {
      dispatch({
        type: GET_OPPORTUNITIES,
        payload: response.data
      });
    });
  };
}

export function setCurrentOpportunity(opportunity) {
  return {
    type: GET_OPPORTUNITY,
    payload: opportunity
  }
}
