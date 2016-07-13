import axios from 'axios';

export const GET_OPPORTUNITIES = 'GET_OPPORTUNITIES';
export const GET_OPPORTUNITY = 'GET_OPPORTUNITY';
export const GET_COMPANY = 'GET_COMPANY';
export const GET_COMPANIES = 'GET_COMPANIES';

let companies = [];

export function getCompanies() {
  return function(dispatch) {
    axios.get('/cos')
      .then((response) => {
        companies = response.data;
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

  console.log('set current op', opportunity);
  
  return {
    type: GET_OPPORTUNITY,
    payload: opportunity
  }
}
