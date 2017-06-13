const actionTypes = {
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DCRYPT: 'DCRYPT',
}

export { actionTypes };

export function createItem(data) {
  return { type: actionTypes.CREATE_ITEM, data }
}

export function updateItem(id, data) {
  return { type: actionTypes.UPDATE_ITEM, data }
}

export function dcryptItems(key) {
  return { type: actionTypes.DCRYPT, key }
}
