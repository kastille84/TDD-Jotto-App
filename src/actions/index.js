import {getLetterMatchCount} from '../helpers';
export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD'
  };
  
  ///**SEE index.test.js for why it's commented out */
// export function correctGuess() {
//   return {
//     type: actionTypes.CORRECT_GUESS
//   }
// }

//action creator
export const guessWord = (guessedWord) => {
  //dispatch & getState is given to us in here by thunk
  //we this return statement gets called in the middleware
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    //dispatched to store the word we used as a guess
    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord: guessedWord,
        letterMatchCount: letterMatchCount
      }
    });
    // conditionally dispatch correct guess if words are correct
    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS
      })
    }

  }
};

