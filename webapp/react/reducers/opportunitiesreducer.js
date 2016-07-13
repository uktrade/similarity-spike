import { GET_OPPORTUNITIES, GET_OPPORTUNITY, GET_COMPANY } from '../actions';

export default function(state = { all: [], currentOpportunity:null }, action) {

  switch (action.type) {
    case GET_OPPORTUNITIES:
      return {...state, all: action.payload};
    case GET_OPPORTUNITY:
      return {...state, currentOpportunity: action.payload};
    case GET_COMPANY:
      return { all: [], currentOpportunity:null }
  }

  return state;
}
