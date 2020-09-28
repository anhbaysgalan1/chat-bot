import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../config/firebase';

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      db.ref('user').once('value', (element) => {
        res.status(200).json(element.val());
      });
      break;

    default:
      res.status(400).json({ message: 'Bad Request' });
      break;
  }
};
