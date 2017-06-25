const actionTypes = {
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  DECRYPT: 'DECRYPT',
  ENCRYPT: 'ENCRYPT',
}

export { actionTypes };

export function createItem(item) {
  return { type: actionTypes.CREATE_ITEM, item }
}

export function updateItem(updatedItem) {
  return { type: actionTypes.UPDATE_ITEM, updatedItem }
}

export function removeItem(id) {
  return { type: actionTypes.REMOVE_ITEM, id }
}

export function decryptItems() {
  return { type: actionTypes.DECRYPT }
}

export function encryptItems() {
  return { type: actionTypes.ENCRYPT }
}
