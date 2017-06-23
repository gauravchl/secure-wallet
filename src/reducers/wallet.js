import { actionTypes } from 'actions/wallet';
import { REHYDRATE } from 'redux-persist/constants';
import CryptoHelper from 'helper/crypto';
import uuidv4 from 'uuid/v4';


const handlers = {
  [actionTypes.CREATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let newItem = {
      _id: uuidv4(),
      title: 'facebook login',
      type: 'LOGIN',
      createdAt: new Date(),
      data: {
        username: 'gauravchl',
        password: '123456789',
        notes: 'some notes',
        website: 'github.com'
      }
    }
    let newState = { ...others, items:  [ newItem, ...items ]}
    return newState;
  },

  [actionTypes.UPDATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let { updatedItem } = action;
    let index = items.findIndex(item => item._id === updatedItem._id)
    let oldItem = items.find(item => item._id === updatedItem._id)
    if (!oldItem) return state;

    items.splice(index, 1, {
      ...oldItem,
      title: updatedItem.title,
      data: updatedItem.data,
      updatedAt: new Date(),
    })

    return { ...others, items:  [...items]}
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
