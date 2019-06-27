//** in larger apps this would be in it's own folder and seaprated out into diff files */
import {storeFactory} from '../test/testUtils';
import { guessWord } from './actions' //action creator

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';
  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord: secretWord};
    beforeEach(() => {
      store = storeFactory(initialState);
    })
    test('updates state correctly for unsuccessful guess', () => {
      //dispatch action creator
      store.dispatch(guessWord(unsuccessfulGuess));
      //check if new state is same as expected state
        //getState() will give us state after dispatch
      const newState = store.getState();
      const expectedState = {
            ...initialState,
            success: false,
            guessedWords: [{
              guessedWord: unsuccessfulGuess,
              letterMatchCount: 3
            }]
          }
      expect(newState).toEqual(expectedState);
    });
    test('updates state corectly for successful guess', () => {
      //dispatch action creator
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord: secretWord,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      }
      expect(newState).toEqual(expectedState);
    });
    
  });
  describe('some guessed words', () => {
    const guessedWords = [{
      guessedWord: 'agile', 
      letterMatchCount: 1
    }];
    const initialState = {
      guessedWords,
      secretWord
    }
    let store;
    beforeEach(() => {
      store = storeFactory(initialState)
    })
    test('updates state corectly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          {guessedWord:'agile', letterMatchCount: 1},
          {guessedWord: unsuccessfulGuess, letterMatchCount: 3}
        ]
      }
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          {guessedWord: secretWord, letterMatchCount: 5}
        ]
      }
      expect(newState).toEqual(expectedState);
    });  
  });
})