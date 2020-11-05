import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../config/firebase';
import phrase from '../../../../utils/phrase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const time: number = Date.now();
      try {
        const { status, data } = await axios.get(
          'https://cat-fact.herokuapp.com/facts/random'
        );
        if (status < 200 || status >= 300)
          throw new Error('Something went wrong');
        db.ref(`message/${req.query.chatId}/${time}`).set(
          { text: data.text, who: 'bot' },
          (error) => {
            if (error) {
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              res
                .status(200)
                .json({ [time]: { text: data.text, who: 'bot' } });
            }
          }
        );
      } catch {
        // in case api server does not work
        const index = Math.floor(Math.random() * 10);
        db.ref(`message/${req.query.chatId}/${time}`).set(
          { text: phrase[index], who: 'bot' },
          (error) => {
            if (error) {
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              res
                .status(200)
                .json({ [time]: { text: phrase[index], who: 'bot' } });
            }
          }
        );
      }

      break;
    }

    default: {
      res.status(400).json({ message: 'Bad Request' });
      break;
    }
  }
};
