import checkPropTypes from "check-prop-types";
import {createStore} from 'redux';

import rootReducer from '../src/reducers';

/**
 * @param  {ShallowWrapper} wrapper
 * @param  {string} val
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};

//creating our own store for testing based off of rootreducer
export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState);
}
