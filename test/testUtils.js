import checkPropTypes from "check-prop-types";
import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../src/reducers';
import {middlewares} from '../src/configureStore';
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

//creating our own store for testing that uses the rootReducer
//from the actual app
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleware(rootReducer, initialState);
}
