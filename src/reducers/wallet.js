import { actionTypes } from 'actions/wallet';
import { REHYDRATE } from 'redux-persist/constants';
import CryptoHelper from 'helper/crypto';


const handlers = {
  [actionTypes.CREATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let newState = { ...others, items:  [{ a: 1 }, ...items ]}
    return newState;
  },
  [actionTypes.UPDATE_ITEM]: (state, action) => {
    return // some new state with note updated
  },
  [actionTypes.DECRYPT]: (state, action) => {
    let { items, decrypted } = state;
    if (decrypted) return state;
    if (!items) return { ...state, local: { ...state.local, decrypted: true }};
    let data = CryptoHelper.decryptItems(items);
    return { ...state, items: data, local: {
        ...state.local,
        decrypted: true,
      }
    }
  },
  [REHYDRATE]: (state, action) => {
    const { wallet } = action.payload;
    return { ...state, ...wallet };
  },
};

const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
