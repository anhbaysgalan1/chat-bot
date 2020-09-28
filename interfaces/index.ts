import { Store, AnyAction } from 'redux';

export interface IBots {
  [key: string]: string;
};

export interface IUser {
  img: string;
};

export interface IMessage {
  text: string;
  who: string;
  temp?: boolean;
}

export interface IChat {
  [key: string]: IMessage;
}

export interface IState {
  bots: IBots | null;
  chat: IChat | null;
  user: IUser | null;
  answer: boolean;
};

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: any;
}