import { Binary } from 'mongodb';
import uuid from 'uuid/v4';

export function mongoUUID(id?: string) {
  return new Binary(Buffer.from(id || uuid()), Binary.SUBTYPE_UUID);
}
