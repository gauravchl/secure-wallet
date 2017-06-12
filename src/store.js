import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import Reducers from 'reducers.js';

let store = createStore(Reducers);
persistStore(store);

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

export default store;
