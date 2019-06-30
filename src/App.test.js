import React from 'react';
import ReactDOM from 'react-dom';
import App, {UnconnectedApp} from './App';

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
  //testing that action creators get called from components when expected to
  test('`getSecretWord runs on App mount', () => {
    const getSecretWordMock = jest.fn();
    const props = {
        //important one
      getSecretWord: getSecretWordMock,
        // not important one, just placing these here so we dont' get warnings
      success: false,
      guessedWords: []
    }

    // setup the app component with getSecretWordMock as the getSecretWord prop
    //we not using setup() cuz it's for our connected App
    const wrapper = shallow(<UnconnectedApp {...props }  />)

    // run lifecycle method
    wrapper.instance().componentDidMount();

    //check to see if our mock ran
    //.mock tells up about all the mocks that happened
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length
    expect(getSecretWordCallCount).toBe(1);
  })
})
