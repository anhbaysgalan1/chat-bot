import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import types from '../types';
import { IUser } from '../../interfaces';

const user = (
  state: IUser = { img: '/placeholder.png' },
  { type, payload }: AnyAction
): IUser => {
  switch (type) {
    case HYDRATE:
      return payload.user;

    case types.GET_USER_SUCCESS:
      return payload;

    case types.GET_USER_START:
    case types.GET_USER_ERROR:
      return state;

    default:
      return state;
  }
};

export default user;
