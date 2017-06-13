import { createStore, compose } from 'redux';
import { persistStore, createTransform } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import Reducers from 'reducers';
import CryptoHelper from 'helper/crypto';

let store = createStore(Reducers);

// Don;t save UI states in localstorage
const loginBlacklistFilter = createBlacklistFilter('login', ['local']);
const walletBlacklistFilter = createBlacklistFilter('wallet', ['local']);

// Encrypt wallet before saving it to local storage
const walletEncrypt = createTransform(
  (inboundState, key) => {
    let { items } = inboundState;
    let { login={}, wallet={}} = store.getState();
    if (!items || !wallet.local || !wallet.local.decrypted) return inboundState;
    let encryptedItems = CryptoHelper.encryptItems(items);
    return { ...inboundState, items: encryptedItems }
  }, undefined, { whitelist: ['wallet']}
)


persistStore(store, { transforms:[ loginBlacklistFilter, walletBlacklistFilter, walletEncrypt ]});

let unsubscribe = store.subscribe(() =>
  console.log('store - ', store.getState())
)

export default store;
