import { combineReducers } from 'redux';
import bots from './bots/reducer';
import chat from './chat/reducer';
import answer from './answer/reducer';
import user from './user/reducer';

export default combineReducers({ bots, chat, answer, user });
