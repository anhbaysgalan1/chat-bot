import React from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { wrapper } from '../redux/store';

import '../styles/bootstrap-reboot.css';
import '../styles/chat-block.css';
import '../styles/chat.css';
import '../styles/style.css';

interface IProps {
  Component: NextComponentType<NextPageContext, {}, any>;
  pageProps: AppProps;
}

const App = ({ Component, pageProps }: IProps) => <Component {...pageProps} />;

export default wrapper.withRedux(App);
