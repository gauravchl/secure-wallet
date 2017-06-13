import { combineReducers } from 'redux';
import wallet from './wallet.js';
import login from './login.js';

export default combineReducers({ wallet, login })
