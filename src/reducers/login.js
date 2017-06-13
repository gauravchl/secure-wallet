import { actionTypes } from 'actions/login';
import { REHYDRATE } from 'redux-persist/constants';
import bcrypt from 'bcryptjs';

const handlers = {
  [actionTypes.LOGIN]: (state, action) => {
    let { masterKey } = action;
    if (!state.masterKey) return throwError(state, 'Master key not found');
    if (!masterKey) return throwError(state, 'Master key required');
    let isMasterKeyCorrect = bcrypt.compareSync(masterKey, state.masterKey);
    if (!isMasterKeyCorrect) return throwError(state, 'Invalid master key');
    let newState = { ...state, local: {
      encryptionKey : isMasterKeyCorrect ? bcrypt.hashSync(masterKey + state.masterKey, 10) : null,
      loggedIn      : true,
    }};
    // TODO - call item action using dispatcher to decrypt items
    return newState
  },
  [actionTypes.CREATE_LOGIN]: (state, action) => {
    let { masterKey } = action;
    if (state.masterKey) return throwError(state, 'Master key is already exist');
    if (!masterKey || !masterKey.trim()) return throwError(state, 'Master key required');
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


function throwError(state, error) {
  return { ...state, local: { ...state.local, error }}
}


const Reducer = (state = {}, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default Reducer
