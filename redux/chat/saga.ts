import { call, put, all, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import types from '../types';
import api from '../../config/api';
import { IChat } from '../../interfaces';

function* getChat({ payload }: AnyAction) {
  try {
    const { status, data }: { status: number; data: IChat } = yield call(
      api.chat.get,
      payload
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_CHAT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_CHAT_ERROR });
  }
}

interface IMessage {
  id: number;
  text: string;
}

interface IPostChatAction {
  type: typeof types.POST_MESSAGE_START;
  payload: { chatId: string; message: IMessage };
}

function* postChat({ payload: { chatId, message } }: IPostChatAction) {
  try {
    const { status, data }: { status: number; data: IChat } = yield call(
      api.chat.post,
      chatId,
      message
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.POST_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.POST_MESSAGE_ERROR });
  }
}

interface IBotsMessageAction {
  type: typeof types.GET_BOT_MESSAGE_START;
  payload: string;
}

function* getBotMessage({ payload }: IBotsMessageAction) {
  try {
    const { status, data }: { status: number; data: IChat } = yield call(
      api.answer.get,
      payload
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_BOT_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_BOT_MESSAGE_ERROR });
  }
}

export function* watcherChat() {
  yield all([
    yield takeLatest(types.GET_CHAT_START, getChat),
    yield takeLatest(types.POST_MESSAGE_START, postChat),
    yield takeLatest(types.GET_BOT_MESSAGE_START, getBotMessage),
  ]);
}
