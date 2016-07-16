import { GET_COMPANIES, GET_COMPANY } from '../actions/actiontypes';


export default function(state = { all: [], selected:null }, action) {

  switch (action.type) {
    case GET_COMPANIES:
      return {...state, all: action.payload};
    case GET_COMPANY:
      return {...state, selected: action.payload};
  }

  return state;
}
