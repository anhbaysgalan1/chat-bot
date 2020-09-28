import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../types';
import api from '../../config/api';
import { IUser } from '../../interfaces';

function* getUser() {
  try {
    const { status, data }: { status: number; data: IUser } = yield call(
      api.user.get
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_USER_ERROR });
  }
}

export function* watcherGetUser() {
  yield takeLatest(types.GET_USER_START, getUser);
}
