import { GET_SUGGESTIONS } from '../actions';

export default function(state = [], action) {

  switch (action.type) {
    case GET_SUGGESTIONS:
      return action.payload.suggestions;
  }

  return state;

}
