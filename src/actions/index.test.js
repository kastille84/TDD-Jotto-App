import {correctGuess, actionTypes}  from './';

describe('correctGuess', () => {
  test('returns an action with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    //.toBe will fail we need to use toEqual to compare objects
    expect(action).toEqual({type: actionTypes.CORRECT_GUESS})
  });
});