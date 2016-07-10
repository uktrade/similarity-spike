import axios from 'axios';

export const GET_OPPORTUNITIES = 'GET_OPPORTUNITIES';
export const GET_SUGGESTIONS = 'GET_SUGGESTIONS';
export const GET_COMPANY = 'GET_COMPANY';

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
  return ({
    type: GET_OPPORTUNITIES,
    payload: axios.post('/opps', {
      n: 5,
      name: company
    })
  });
}

export function clearSuggestions() {
    return ({
    type: GET_SUGGESTIONS,
    payload: { term: '', suggestions: [] }
  });
}

export function getSuggestions(term) {

  let suggestions = [];

  if (term.length > 2) {
    suggestions = cos.filter((item) => {
      let itemName = item.name.toLocaleLowerCase();
      return itemName.indexOf(term.toLocaleLowerCase()) !== -1;
    });
  }

  return ({
    type: GET_SUGGESTIONS,
    payload: { term, suggestions }
  });
}

