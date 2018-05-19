// import { Collection } from 'mongodb';

// import logger from '../logger';
// import { getDb } from './index';

// type Attendance = {
//   _id?: string;
//   deviceId: string;

//   id: number;
//   uid: number;
//   state: number;
//   timestamp: Date;
// };

// const COLLECTION_NAME = 'attendances';

// // let attendanceCollection: Collection<Attendance>;

// function getCollection() {
//   // if (attendanceCollection) {
//   //   return attendanceCollection;
//   // }

//   // attendanceCollection = getDb().collection<Attendance>(COLLECTION_NAME);

//   // return attendanceCollection;

//   return getDb().collection<Attendance>(COLLECTION_NAME);
// }

// export async function getLastAttendance(deviceId: string) {
//   const results = await getCollection()
//     .find({ deviceId: deviceId })
//     .sort({ timestamp: -1 })
//     .limit(1)
//     .toArray();

//   return results.length > 0 ? results[0] : null;
// }

// export function find(deviceId: string, timestamp: Date) {
//   return getCollection()
//     .find({ deviceId: deviceId, timestamp: { $gte: timestamp } })
//     .sort({ timestamp: 1 })
//     .toArray();
// }

// export function insertMany(attendances: Attendance[]) {
//   return getCollection().insertMany(attendances);
// }
