import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import Reducers from 'reducers';

let store = createStore(Reducers);

// Don;t save login key in localstorage
const saveSubsetBlacklistFilter = createBlacklistFilter(
  'login', ['key']
);


persistStore(store, { transforms:[saveSubsetBlacklistFilter]});

let unsubscribe = store.subscribe(() =>
  console.log('store - ', store.getState())
)

export default store;
