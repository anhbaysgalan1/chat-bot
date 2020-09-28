import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../config/firebase';

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      db.ref(`message/${req.query.chatId}`).once('value', (element) => {
        res.status(200).json(element.val() || {});
      });
      break;
    }

    case 'POST': {
      const { time, text } = req.body;
      db.ref(`message/${req.query.chatId}/${time}`).set(
        { text, who: 'user' },
        (error) => {
          if (error) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            res.status(201).json(time);
          }
        }
      );
      break;
    }

    default: {
      res.status(400).json({ message: 'Bad Request' });
      break;
    }
  }
};
