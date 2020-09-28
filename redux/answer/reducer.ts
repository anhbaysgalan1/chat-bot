import { AnyAction } from 'redux';
import types from '../types';

const answer = (
  state: boolean = false,
  { type, payload }: AnyAction
): boolean => {
  switch (type) {
    case types.ANSWER:
      return payload;

    case types.POST_MESSAGE_ERROR:
    case types.GET_BOT_MESSAGE_ERROR:
    case types.GET_BOT_MESSAGE_SUCCESS:
      return false;

    case types.POST_MESSAGE_SUCCESS:
      return true;

    default:
      return state;
  }
};

export default answer;
