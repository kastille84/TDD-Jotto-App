import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    //tells axios to use moxios for all of it's requests
    moxios.install()
  });
  afterEach(() => {
    // return axios to it's original state
    moxios.uninstall()
  });

  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    //wait(), tells moxios how to respond when axios sends in a request
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200,
        response: secretWord
      })
    });

    // dispatch the action using the store
    //since getSecret word returns a function that returns a PROMISE
    //then store.dispatch() will return a Promise as well
    return store.dispatch(getSecretWord())
      //it will wait to run this calback, until a Promise is resolve
      .then(()=> {
        //at this point, we assume the getSecretWord made the request
        //it came back with a response and saved it in the reducer as a newState
        //we get the newState and compare it to 'party'
        const newState = store.getState();
        expect(newState.secretWord).toBe(secretWord);
      })
      //*note, we are return a promise which means it will wait till it resolves 
      //before completing the test
  });
})