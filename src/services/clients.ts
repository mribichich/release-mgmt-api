// import * as uuid from 'uuid/v4';
// import { Collection, Db } from 'mongodb';

// import { getDb } from '../db';

// type Client = {
//   _id: string;
//   name: string;
// };

// const CLIENTS = 'clients';

// let db: Db;

// const getCollection = () => {
//   if (!db) {
//     db = getDb();
//   }

//   return db.collection<Client>(CLIENTS);
// };

// export const create = async (name: string) => {
//   const collection = getCollection();

//   const client = {
//     _id: uuid(),
//     name: name
//   };

//   await collection.insertOne(client);

//   return client;
// };

// export const findOne = async (name: string) => {
//   const collection = getCollection();

//   return await collection.findOne({
//     name: { $regex: `^${name}$`, $options: 'i' }
//   });
// };

// export const find = async () => {
//   const collection = getCollection();

//   return await collection.find().toArray();
// };

// export const count = async (name: string) => {
//   const collection = getCollection();

//   return await collection.count({
//     name: { $regex: `^${name}$`, $options: 'i' }
//   });
// };
