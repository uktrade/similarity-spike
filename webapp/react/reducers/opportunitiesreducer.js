import { GET_OPPORTUNITIES, GET_OPPORTUNITY } from '../actions/actiontypes';


export default function(state = { all: [], selected:null }, action) {

  switch (action.type) {
    case GET_OPPORTUNITIES:
      return {...state, all: action.payload};
    case GET_OPPORTUNITY:
      return {...state, selected: action.payload};
  }

  return state;
}
