import React, { ReactChild, useState } from 'react';
import Router from 'next/router';
import Sidebar from '../Sidebar';
import Logo from '../Logo';
import RoutingLoader from '../Loaders/RoutingLoader';

type IProps = {
  children: ReactChild;
};

const ChatWrap = ({ children }: IProps) => {
  const [routeChange, setRouteChange] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setRouteChange(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setRouteChange(false);
  });

  return (
    <div className="container">
      <div className="row chat-container">
        <div className="chat-col">
          <div className="chat-wrap">
            <Sidebar />
            <div className="chat-block">
              {routeChange && <RoutingLoader />}
              {children}
            </div>
          </div>
        </div>

        <Logo />
      </div>
    </div>
  );
};

export default ChatWrap;
