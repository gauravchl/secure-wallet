const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_LOGIN: 'CREATE_LOGIN',
  UPDATE_LOGIN: 'UPDATE_LOGIN',
}

export { actionTypes };

export function login(masterKey) {
  return { type: actionTypes.LOGIN, masterKey }
}

export function createLogin(masterKey) {
  return { type: actionTypes.CREATE_LOGIN, masterKey }
}

export function updateLogin(oldMasterKey, newMasterKey) {
  return { type: actionTypes.UPDATE_LOGIN, oldMasterKey, newMasterKey }
}

export function logout() {
  return { type: actionTypes.LOGOUT }
}
