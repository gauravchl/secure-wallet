import { actionTypes } from 'actions/login';
import { REHYDRATE } from 'redux-persist/constants';

const handlers = {
  [actionTypes.LOGIN]: (state, action) => {
    let { masterKey } = action;
    if (!state.login || !state.login.masterKey) throw new Error('No login found');
    let shouldLogin = bcrypt.compareSync(masterKey, state.login.masterKey);
    //let key = bcrypt.hashSync(masterKey + state.login.masterKey, 10)
    return { ...state }
  },
  [actionTypes.CREATE_LOGIN]: (state, action) => {
    let { masterKey } = action;
    if (state.masterKey) throw new Error('Master key already exist');
    //let hash = bcrypt.hashSync(myPlaintextPassword, 10)
    return { ...state,  masterKey: hash}
  },
  [actionTypes.UPDATE_LOGIN]: (state, action) => {
    let { oldMasterKey, newMasterKey } = action;
    let newState = { ...state, masterKey: newMasterKey };
    return newState;
  },
  [REHYDRATE]: (state, action) => {
    const masterKey = action.payload.masterKey;
    return { ...state, masterKey: masterKey };
  },
};



const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
