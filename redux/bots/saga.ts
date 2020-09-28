import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../types';
import api from '../../config/api';
import { IBots } from '../../interfaces';

function* getBots() {
  try {
    const { status, data }: { status: number; data: IBots } = yield call(
      api.bots.get
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_BOTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_BOTS_ERROR });
  }
}

export function* watcherGetBots() {
  yield takeLatest(types.GET_BOTS_START, getBots);
}
