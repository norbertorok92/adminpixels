import { createStore, applyMiddleware } from 'redux';

import rootReducer from './root-reducer'

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState
  );
  return store;
}

export default configureStore;
