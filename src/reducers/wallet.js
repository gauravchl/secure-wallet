import { actionTypes } from 'actions/wallet';
import { REHYDRATE } from 'redux-persist/constants';
import CryptoHelper from 'helper/crypto';
import uuidv4 from 'uuid/v4';


const handlers = {
  [actionTypes.CREATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let { item={}} = action;

    let newItem = {
      _id: uuidv4(),
      title: item.title || 'Untitled',
      type: 'LOGIN',
      createdAt: new Date(),
      data: {
        username: item.data && item.data.username,
        password: item.data && item.data.password,
        notes: item.data && item.data.notes,
        website: item.data && item.data.website,
      }
    }
    let newState = {
      ...others,
      items:  [ newItem, ...items ],
      local: {
        ...state.local,
        selectedItemId: newItem._id,
      }
    }
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
      title: updatedItem.title || 'Untitled',
      data: updatedItem.data,
      updatedAt: new Date(),
    })

    return { ...others, items:  [...items]}
  },
  [actionTypes.REMOVE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let { id } = action;
    let index = items.findIndex(item => item._id === id);
    if (index < 0) return state;
    items.splice(index, 1);

    let newState = {
      ...others,
      items:  [...items],
      local: {
        ...state.local,
        selectedItemId: items.length && items[0]._id
      }
    };
    return newState
  },

  [actionTypes.DECRYPT]: (state, action) => {
    let { items, local={}} = state;
    if (local.decrypted) return state;
    if (!items) return { ...state, local: { ...state.local, decrypted: true }};
    let data = CryptoHelper.decryptItems(items);
    return { ...state, items: data, local: {
        ...state.local,
        decrypted: true,
        selectedItemId: data && data.length && data[0]._id,
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
  [actionTypes.SELECT_ITEM]: (state, action) => {
    let { id } = action;
    return { ...state, local: {
        ...state.local,
        selectedItemId: id,
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
