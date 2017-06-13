import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import Reducers from 'reducers';

let store = createStore(Reducers);

// Don;t save login key in localstorage
const loginBlacklistFilter = createBlacklistFilter('login', ['local']);
const itemsBlacklistFilter = createBlacklistFilter('wallet', ['local']);


persistStore(store, { transforms:[ loginBlacklistFilter, itemsBlacklistFilter ]});

let unsubscribe = store.subscribe(() =>
  console.log('store - ', store.getState())
)

export default store;
