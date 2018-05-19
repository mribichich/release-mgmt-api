import { Binary } from 'mongodb';

export type TimeClock = {
  _id: Binary;
  version: number;
  createdTimestamp: Date;
  createdByUserId: Binary | null;
  lastModifiedTimestamp: Date | null;
  lastModifiedByUserId: Binary | null;

  dateTime: Date;
  employeeId: Binary;
  employeeName: string;
  employeeNameInsensitive: string;
  employeeNid: string;
  employeeNidInsensitive: string;
};

export type IEvent = {
  _id: Binary;
  _t: string;
  aggregateId: Binary;
  version: number;
  timestamp: Date;
  userId: Binary;
  entityType: string;
};

export type TimeClockCreated = IEvent & {
  dateTime: Date;
  employeeId: string;
};

export type TimeClockUpdated = IEvent & {
  dateTime: Date;
  employeeId: string;
};
