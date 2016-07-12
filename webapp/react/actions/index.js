import axios from 'axios';

export const GET_OPPORTUNITIES = 'GET_OPPORTUNITIES';
export const GET_COMPANY = 'GET_COMPANY';
export const CHANGE_TERM = 'CHANGE_TERM';

let cos = [];
axios.get('/cos').then((response) => {
  cos = response.data;
});

export function getCompany(name) {
  let lowerName = name.toLocaleLowerCase();

  let companies = cos.filter((item) => {
    return item.name.toLocaleLowerCase().indexOf(lowerName) !== -1;
  });

  if (companies.length > 0) {
    return {
      type: GET_COMPANY,
      payload: companies[0]
    }
  }

  return {
    type: GET_COMPANY,
    payload: null
  };
}

export function getOpportunities(company) {
  return function(dispatch) {
    dispatch({
      type: GET_OPPORTUNITIES,
      payload: {
        data: []
      }
    });

    dispatch({
      type: GET_OPPORTUNITIES,
      payload: axios.post('/opps', {
        n: 5,
        name: company
      })
    });
  }
}

export function setTerm(term) {

  let companies = cos.filter((item) => {
    let itemName = item.name.toLocaleLowerCase();
    return itemName.indexOf(term.toLocaleLowerCase()) !== -1;
  });


  return ({
    type: CHANGE_TERM,
    payload: { term, companies }
  });
}
