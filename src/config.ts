import fs from 'fs';
import { mergeDeepRight } from 'ramda';

interface Config {
  servicePort: number;

  mongoDbHost: string;
  mongoDbPort: number;
  mongoDbDatabase: string;
  mongoDbUser: string;
  mongoDbPassword: string;
}

const DEFAULT_CONFIG: Config = {
  servicePort: 56182,

  mongoDbHost: 'localhost',
  mongoDbPort: 27017,
  mongoDbDatabase: 'ReleaseMgmtApi',
  mongoDbUser: null,
  mongoDbPassword: null
};

let config: Config = {
  servicePort: defaultTo(
    DEFAULT_CONFIG.servicePort,
    process.env.SERVICE_PORT ? parseInt(process.env.SERVICE_PORT) : null
  ),

  mongoDbHost: defaultTo(DEFAULT_CONFIG.mongoDbHost, process.env.RELEASE_MGMT_API_DB_HOST),
  mongoDbPort: defaultTo(
    DEFAULT_CONFIG.mongoDbPort,
    process.env.RELEASE_MGMT_API_DB_PORT ? parseInt(process.env.RELEASE_MGMT_API_DB_PORT) : null
  ),
  mongoDbDatabase: defaultTo(DEFAULT_CONFIG.mongoDbDatabase, process.env.RELEASE_MGMT_API_DB_DATABASE),
  mongoDbUser: defaultTo(DEFAULT_CONFIG.mongoDbUser, process.env.RELEASE_MGMT_API_DB_USER),
  mongoDbPassword: defaultTo(DEFAULT_CONFIG.mongoDbPassword, process.env.RELEASE_MGMT_API_DB_PASSWORD)
};

function defaultTo(...args) {
  let value;

  for (const arg of args) {
    value = arg || value;
  }

  return value;
}

// if (process.env.RELEASE_MGMT_API_DB_HOST){
//   envs = { ...envs, mongoDbHost : process.env.RELEASE_MGMT_API_DB_HOST}
// }

// const config: Config = mergeDeepRight(DEFAULT_CONFIG, envs);

export default Object.freeze(config);
