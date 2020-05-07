import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './root-reducer'

// const bindMiddleware = middleware => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension');
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,

    initialState
  );

  return store;
}

export default configureStore;
