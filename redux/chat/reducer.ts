import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import types from '../types';
import { IChat } from '../../interfaces';

const chat = (state: IChat = {}, { type, payload }: AnyAction): IChat => {
  switch (type) {
    case HYDRATE:
      return payload.chat;

    case types.GET_CHAT_SUCCESS:
      return payload;

    case types.GET_BOT_MESSAGE_SUCCESS:
      return { ...state, ...payload };

    case types.POST_MESSAGE_START:
      return {
        ...state,
        [payload.message.time]: {
          who: 'user',
          text: payload.message.text,
          temp: true,
        },
      };

    case types.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        [payload]: {
          who: 'user',
          text: state[payload].text,
        },
      };

    case types.POST_MESSAGE_ERROR:
    case types.GET_CHAT_ERROR:
    case types.GET_CHAT_START:
      return state;

    default:
      return state;
  }
};

export default chat;
