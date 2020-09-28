import React from 'react';
import { END } from 'redux-saga';

import ChatWrap from '../../components/ChatWrap';
import MessageForm from '../../components/MessageForm';
import Chat from '../../components/Chat';

import { wrapper } from '../../redux/store';
import types from '../../redux/types';
import { IState, IStore } from '../../interfaces';
import { GetServerSidePropsContext } from 'next';

const BotChat = () => (
  <main className="main">
    <ChatWrap>
      <div className="blocked-wrap">
        <Chat />
        <MessageForm />
      </div>
    </ChatWrap>
  </main>
);

export const getServerSideProps = wrapper.getServerSideProps(
  async (
    context: GetServerSidePropsContext & { store: IStore },
  ): Promise<void> => {
    const state: IState = context.store.getState();

    // dispatch server actions
    if (state.bots && state.chat && state.user) {
      context.store.dispatch({ type: types.GET_BOTS_START });
      context.store.dispatch({ type: types.GET_USER_START });
      context.store.dispatch({
        type: types.GET_CHAT_START,
        payload: context.params!.bot,
      });
      context.store.dispatch(END);
    }

    await context.store.sagaTask.toPromise();
  },
);

export default BotChat;
