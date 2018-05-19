import * as isNil from 'ramda/src/isNil';

import { getDb } from './db';

const getStatus = () => {
  const db = getDb();

  const dbStatus = !isNil(db);
  const all = dbStatus;

  return {
    all: all,
    db: dbStatus
  };
};

export default (req, res) => {
  res.json(getStatus());
};
