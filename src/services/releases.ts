import { Collection, Db } from 'mongodb';

import { getDb } from '../db';
// import * as clientsService from './clients';
import { mongoUUID } from '../utils';

type Release = {
  _id: string;
  timestamp: Date;
  application: string;
  version: string;
};

const RELEASES = 'releases';

let db: Db;

const getCollection = () => {
  if (!db) {
    db = getDb();
  }

  return db.collection<Release>(RELEASES);
};

export const create = async (timestamp: Date | null, application: string, version: string) => {
  const collection = getCollection();

  // let client = await clientsService.findOne(clientName);

  // if (!client) {
  //   client = await clientsService.create(clientName);
  // }

  const release = {
    // _id: mongoUUID(),
    timestamp: timestamp || new Date(),
    application: application,
    version: version
  };

  const result = await collection.insertOne(release);

  return { ...release, _id: result.insertedId };
};

export const findOne = async (application: string, version: string) => {
  const collection = getCollection();

  return await collection.findOne({
    application: { $regex: `^${application}$`, $options: 'i' },
    version: version
  });
};

export const find = async (application: string, timestampStart: Date, timestampEnd: Date) => {
  const collection = getCollection();

  let andQuery = [];

  if (application) {
    andQuery = [...andQuery, { application: { $regex: `^${application}$`, $options: 'i' } }];
  }

  if (timestampStart) {
    andQuery = [...andQuery, { timestamp: { $gte: timestampStart } }];
  }

  if (timestampEnd) {
    andQuery = [...andQuery, { timestamp: { $lt: timestampEnd } }];
  }

  let query = {};

  if (andQuery.length) {
    query = {
      ...query,
      $and: andQuery
    };
  }

  return await collection.find(query).toArray();
};

export const deleteOneById = async (id: string) => {
  const collection = getCollection();

  return await collection.deleteOne({ _id: id });
};

export const deleteOne = async (application: string, version: string) => {
  const collection = getCollection();

  return await collection.deleteOne({ application, version });
};
