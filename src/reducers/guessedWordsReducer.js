//btw, we don't need an accompanying test file
//because we will do integration test in 'integration.test.js'

import {actionTypes} from '../actions';
export default (state=[], action) => {
  switch(action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
}