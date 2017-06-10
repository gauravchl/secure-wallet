const actionTypes = {
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
}

export { actionTypes };

export function createItem(uid, password) {
  return { type: actionTypes.CREATE_ITEM }
}

export function updateItem(id, data) {
  return { type: actionTypes.UPDATE_ITEM, data }
}
