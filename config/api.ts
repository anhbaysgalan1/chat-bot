import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEV_URL
    : process.env.PROD_URL;

export interface IApi {
  bots: {
    get: <T>() => Promise<AxiosResponse<T>>;
  };
  user: {
    get: <T>() => Promise<AxiosResponse<T>>;
  };
  chat: {
    get: <T, S>(chatId: S) => Promise<AxiosResponse<T>>;
    post: <S>(
      chatId: string | number,
      message: S
    ) => Promise<AxiosResponse<string | number>>;
  };
  answer: {
    get: <T, S>(chatId: S) => Promise<AxiosResponse<T>>;
  };
}

const api: IApi = {
  bots: {
    get: () => axios.get('/api/bots'),
  },
  user: {
    get: () => axios.get('/api/user'),
  },
  chat: {
    get: (chatId) => axios.get(`/api/chat/${chatId}`),
    post: (chatId, message) => axios.post(`/api/chat/${chatId}`, message),
  },
  answer: {
    get: (chatId) => axios.get(`/api/answer/${chatId}`),
  },
};

export default api;
