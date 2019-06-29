import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {storeFactory} from '../test/testUtils';
import {shallow} from 'enzyme';

const setup = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}


describe("Redux Props", () => {
  //testing redux props
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({success: success})
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  }); 
  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({secretWord: secretWord});
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  })
  test('has access to `guessedWord` state', () => {
    const guessedWords = [{guessedWord: 'train', letterMatchCount: 3}];
    const wrapper = setup({guessedWords: guessedWords});
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  })
  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    console.log('innnsatnce',wrapper)
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  })
})
