import { CHANGE_TERM } from '../actions';

export default function(state = '', action) {

  switch (action.type) {
    case CHANGE_TERM:
      return action.payload.term;
  }

  return state;

}
