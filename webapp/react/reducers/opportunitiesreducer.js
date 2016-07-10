import { GET_OPPORTUNITIES } from '../actions';

export default function(state = [], action) {

  switch (action.type) {
    case GET_OPPORTUNITIES:
      return action.payload.data;
  }

  return state;

}
