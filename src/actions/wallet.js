const actionTypes = {
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DECRYPT: 'DECRYPT',
  ENCRYPT: 'ENCRYPT',
}

export { actionTypes };

export function createItem(data) {
  return { type: actionTypes.CREATE_ITEM, data }
}

export function updateItem(id, data) {
  return { type: actionTypes.UPDATE_ITEM, data }
}

export function decryptItems() {
  return { type: actionTypes.DECRYPT }
}

export function encryptItems() {
  return { type: actionTypes.ENCRYPT }
}
