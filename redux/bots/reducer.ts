import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import types from '../types';
import { IBots } from '../../interfaces';

const bots = (state: IBots = {}, { type, payload }: AnyAction): IBots => {
  switch (type) {
    case HYDRATE:
      return payload.bots;

    case types.GET_BOTS_SUCCESS:
      return payload;

    case types.GET_BOTS_START:
    case types.GET_BOTS_ERROR:
      return {};

    default:
      return state;
  }
};

export default bots;
