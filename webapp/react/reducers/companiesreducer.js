import { GET_COMPANIES, GET_COMPANY } from '../actions';

function sortCompanies(a,b) {
  const nameA = a.name.toLocaleLowerCase();
  const nameB = b.name.toLocaleLowerCase();

  if ( nameA < nameB ) return -1;
  if ( nameA > nameB ) return 1;
  return 0;
}


export default function(state = { all: [], currentCompany:null }, action) {

  switch (action.type) {
    case GET_COMPANIES:
      return { ...state, all: action.payload.sort(sortCompanies)};
    case GET_COMPANY:
      return {...state, currentCompany: action.payload};
  }

  return state;
}
