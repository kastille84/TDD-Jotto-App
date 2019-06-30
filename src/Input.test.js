import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, storeFactory } from '../test/testUtils';
import Input, {UnconnectedInput} from  './Input';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
    //Important! dive() returns the react child compo of the shallow wrapper
  const wrapper = shallow(<Input store={store} />).dive().dive();
  //console.log(wrapper.debug());
  return wrapper;
} 

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: false};
      wrapper = setup(initialState);
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper,'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper,'input-box');
      expect(inputBox.length).toBe(1);
    })
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper,'submit-button');
      expect(submitButton.length).toBe(1);
    })
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: true};
      wrapper = setup(initialState)
    })
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input')
      expect(component.length).toBe(1);
    });
    test('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    })
    test('does not renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    })
  });
});

describe('redux props', () => {
  test('has success piece of state as props', () => {
    const success = true;
    const wrapper = setup({success: success});
    //instance() is the actual component
    //now we have access to .props.success
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  //check that the guessword
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  })

});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(()  => {
     guessWordMock = jest.fn();    
     const props = {guessWord: guessWordMock}
    // set up app component with guessWordMock as guessWord prop
     wrapper = shallow(<UnconnectedInput {...props} />);
     // add a value to the inputBox
     wrapper.instance().inputBox.current = { value: guessedWord };
     //simulate a click
     const submitButton = findByTestAttr(wrapper, 'submit-button');
     //**simulate doenst default have event, so we need to pass a func */
     //
     submitButton.simulate('click', {preventDefault(){} });
  })

  test('`guessWord` gets called on submit button click', () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessWord` with input value as argument ', () => {
    //console.log(guessWordMock.mock.calls); [['train']]
    const guessWordArg  = guessWordMock.mock.calls[0][0];
    //expect whatever guessedWord happened to be called with, to be guessedWord
    expect(guessWordArg).toBe(guessedWord);
  });

  test('inputBox clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
