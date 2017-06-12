import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import Reducers from 'reducers';

let store = createStore(Reducers);
persistStore(store).purge();

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

export default store;
