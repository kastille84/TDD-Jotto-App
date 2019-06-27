import {combineReducers} from 'redux';
import success from './successReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';

export default combineReducers({
  success: success,
  guessedWords: guessedWords,
  secretWord: secretWord
})
