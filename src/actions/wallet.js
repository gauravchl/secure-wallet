const actionTypes = {
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
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

export function decryptItems() {
  return { type: actionTypes.DECRYPT }
}

export function encryptItems() {
  return { type: actionTypes.ENCRYPT }
}
