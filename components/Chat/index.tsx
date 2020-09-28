import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Loaders/Spinner';
import Typing from '../Loaders/Typing';
import { IBots, IChat, IState } from '../../interfaces';
import types from '../../redux/types';
import formateDate from '../../utils/helpers';

const Chat = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const bot: string =
    typeof router.query.bot === 'string'
      ? router.query.bot
      : router.query.bot[0];

  const answer = useSelector<IState, boolean>((state: IState) => state.answer);
  const bots = useSelector<IState, IBots>((state: IState) => state.bots);
  const userImg = useSelector<IState, string>(
    (state: IState) => state.user.img,
  );
  const chat = useSelector<IState, IChat | null>(
    (state: IState): IChat | null => state.chat,
  );

  useEffect(() => {
    if (answer) {
      setTimeout(() => {
        dispatch({ type: types.GET_BOT_MESSAGE_START, payload: bot });
      }, 1500); // requirement in terms of reference
    }
  }, [answer]);

  return (
    <div className="chat">
      {answer && <Typing />}

      {chat &&
        Object.entries(chat)
          .reverse()
          // item-> [1244323243, { text: '...', who: '...' temp?: false }]
          // item[0] -> time in miliseconds
          // item[1] -> { text: '...', who: '...' temp?: false }
          // temp -> temporary - show message with loader before it send to db
          .map(item => (
            <Fragment key={item[0]}>
              <div
                className={
                  item[1].who === 'user'
                    ? 'chat-message user-message'
                    : 'chat-message'
                }
              >
                <div className="chat-message-foto">
                  <img
                    src={item[1].who === 'user' ? userImg : bots[bot]} // bots - { sherlok: 'img_path' } bot - sherlok
                    alt=""
                  />
                </div>
                <div className="chat-message-text">{item[1].text}</div>
                <div className="chat-message-time">{formateDate(+item[0])}</div>
              </div>

              {item[1].temp && (
                <Spinner
                  style={{ justifyContent: 'flex-end', marginRight: 5 }}
                  svgSize={18}
                />
              )}
            </Fragment>
          ))}
    </div>
  );
};

export default Chat;
