import React from 'react';
import { END } from 'redux-saga';
import ChatWrap from '../components/ChatWrap';
import types from '../redux/types';
import { wrapper } from '../redux/store';
import { IStore } from '../interfaces';

const Index = () => {
  return (
    <main className='main'>
      <ChatWrap>
        <div className='chat-block'>
          <div className='home'>
            <h1 className='home-title'>Hello ✋</h1>
            <p>Select chat-bot in side panel and write something</p>
          </div>
        </div>
      </ChatWrap>
    </main>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }: { store: IStore }): Promise<void> => {
    store.dispatch({ type: types.GET_BOTS_START });
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default Index;
