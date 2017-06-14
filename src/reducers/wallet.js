import { actionTypes } from 'actions/wallet';
import { REHYDRATE } from 'redux-persist/constants';
import CryptoHelper from 'helper/crypto';


const handlers = {
  [actionTypes.CREATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let newItem = {
      title: 'New login',
      type: 'LOGIN',
      createdAt: new Date(),
      data: {
        username: 'gaurav',
        password: '123456789',
        notes: 'some notes',
        website: 'google.com'
      }
    }
    let newState = { ...others, items:  [ newItem, ...items ]}
    return newState;
  },
  [actionTypes.UPDATE_ITEM]: (state, action) => {
    return // some new state with note updated
  },
  [actionTypes.DECRYPT]: (state, action) => {
    let { items, local={}} = state;
    if (local.decrypted) return state;
    if (!items) return { ...state, local: { ...state.local, decrypted: true }};
    let data = CryptoHelper.decryptItems(items);
    return { ...state, items: data, local: {
        ...state.local,
        decrypted: true,
      }
    }
  },
  [actionTypes.ENCRYPT]: (state, action) => {
    let { items, local={}} = state;
    if (!local.decrypted) return state;
    let data = CryptoHelper.encryptItems(items);
    return { ...state, items: data, local: {
        ...state.local,
        decrypted: false,
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
