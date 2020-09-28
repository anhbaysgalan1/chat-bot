import React, { ReactChild } from 'react';
import Sidebar from '../Sidebar';
import Logo from '../Logo';

type IProps = {
  children: ReactChild;
};

const ChatWrap = ({ children }: IProps) => {
  return (
    <div className="container">
      <div className="row chat-container">
        <div className="chat-col">
          <div className="chat-wrap">
            <Sidebar />
            {children}
          </div>
        </div>

        <Logo />
      </div>
    </div>
  );
};

export default ChatWrap;
