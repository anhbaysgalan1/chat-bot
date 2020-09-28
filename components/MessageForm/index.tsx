import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import types from '../../redux/types';

const MessageForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bot } = router.query;
  const [text, setText] = useState('');

  const handleInput = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
    if (target.value.length > 400) return;
    setText(target.value);
  };

  const hadleSubmit = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (text.trim().length) {
        event.preventDefault(); // for prevent cursore relocate to the next line
        dispatch({
          type: types.POST_MESSAGE_START,
          payload: {
            chatId: bot,
            message: {
              time: Date.now(),
              text: text.trim(),
            },
          },
        });

        setText('');
      }
    }
  };

  return (
    <div className="chat-form">
      <form action="#" method="post" id="form">
        <div className="textarea-wrap">
          <textarea
            value={text}
            form="form"
            placeholder="Text"
            onChange={handleInput}
            onKeyPress={hadleSubmit}
          />
        </div>
        <div className="textarea-count-wrap">
          <div className="checkbox-wrap">Press Enter to send</div>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
