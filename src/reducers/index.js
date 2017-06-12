import { combineReducers } from 'redux';
import items from './items.js';
import login from './login.js';

export default combineReducers({ items, login })
