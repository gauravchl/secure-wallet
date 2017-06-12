import { actionTypes } from 'actions/items';
import { REHYDRATE } from 'redux-persist/constants'

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
  [REHYDRATE]: (state, action) => {
    const items = action.payload.items || [];
    return { ...state, items };
  },
};



const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
