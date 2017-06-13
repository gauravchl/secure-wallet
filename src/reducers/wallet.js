import { actionTypes } from 'actions/wallet';
import { REHYDRATE } from 'redux-persist/constants';
import { AES, enc } from 'crypto-js';


const handlers = {
  [actionTypes.CREATE_ITEM]: (state, action) => {
    let { items=[], ...others } = state;
    let newState = { ...others, items:  [{ a: 1 }, ...items ]}
    console.log(newState);
    return newState;
  },
  [actionTypes.UPDATE_ITEM]: (state, action) => {
    return // some new state with note updated
  },
  [actionTypes.DCRYPT]: (state, action) => {
    let { key } = action;
    let { items='' } = state;
    if (!key) return state;
    let bytes = AES.decrypt(items, key);
    let data = JSON.parse(bytes.toString(enc.Utf8));
    return { ...state, items: data, dcrypted: true }
  },
  [REHYDRATE]: (state, action) => {
    const items = action.payload.items || [];
    return { ...state, items }
  },
};



const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
