import { MongoClient, Db, Collection } from 'mongodb';

import logger from '../logger';

let mongoClient: MongoClient;
let url: string;
let databaseName: string;
let mongoDb: Db;

export default function(
  mongoDbHost: string,
  mongoDbPort: number,
  mongoDbDatabase: string,
  mongoDbUser: string,
  mongoDbPassword: string
) {
  const mongoAuth = mongoDbUser ? `${mongoDbUser}:${mongoDbPassword}@` : '';
  url = `mongodb://${mongoAuth}${mongoDbHost}:${mongoDbPort}/${mongoDbDatabase}`;

  databaseName = mongoDbDatabase;
}

export async function open() {
  mongoClient = await MongoClient.connect(url);

  mongoDb = mongoClient.db(databaseName);
}

export async function close() {
  if (mongoClient) {
    await mongoClient.close();
  }
}

export function getDb() {
  return mongoDb;
}
