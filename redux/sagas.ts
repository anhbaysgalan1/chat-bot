import { all, fork } from 'redux-saga/effects';
import { watcherGetBots } from './bots/saga';
import { watcherChat } from './chat/saga';
import { watcherGetUser } from './user/saga';

export default function* rootSaga() {
  yield all([
    yield fork(watcherGetBots),
    yield fork(watcherChat),
    yield fork(watcherGetUser),
  ]);
}
