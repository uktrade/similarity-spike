import { GET_COMPANY } from '../actions';

export default function(state = null, action) {

  switch (action.type) {
    case GET_COMPANY:
      return action.payload;
  }

  return state;

}
