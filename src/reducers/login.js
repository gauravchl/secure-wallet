import { actionTypes } from 'actions/login';
import { REHYDRATE } from 'redux-persist/constants';
import bcrypt from 'bcryptjs';

const handlers = {
  [actionTypes.LOGIN]: (state, action) => {
    let { masterKey } = action;
    console.log(state)
    if (!state.masterKey) throw new Error('No login found');
    let shouldLogin = bcrypt.compareSync(masterKey, state.masterKey);
    let key = shouldLogin ? bcrypt.hashSync(masterKey + state.masterKey, 10) : null;
    return { ...state, key }
  },
  [actionTypes.CREATE_LOGIN]: (state, action) => {
    let { masterKey } = action;
    if (state.masterKey) throw new Error('Master key already exist');
    let hash = bcrypt.hashSync(masterKey, 10)
    return { ...state,  masterKey: hash }
  },
  [actionTypes.UPDATE_LOGIN]: (state, action) => {
    let { oldMasterKey, newMasterKey } = action;
    let newState = { ...state, masterKey: newMasterKey };
    return newState;
  },
  [REHYDRATE]: (state, action) => {
    return action.payload.login || state;
  },
};



const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
