import fs from 'fs';
import path from 'path';
import retry from 'retry';
import promiseFinally from 'promise.prototype.finally';
import { length, splitEvery, map, filter, not, isEmpty, tryCatch, forEach, difference, find, takeLast } from 'ramda';
import { eachSeries, ErrorCallback } from 'async';
import uuid from 'uuid/v4';
import { Collection, Binary } from 'mongodb';

import config from './config';
import logger from './logger';
import initDb, { open as openMongoDb, getDb as getMongoDb, close as closeMongoDb } from './db/index';
import { TIME_CLOCK_ENTITY_TYPE } from './constants';
import { TimeClock, IEvent, TimeClockCreated, TimeClockUpdated } from './types';
import { listen } from './app';

promiseFinally.shim();

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

logger.info(`Starting service v${packageJson.version} ...`);

const onDestroy = [
  async () => {
    logger.debug(`Closing connection to mongoDb...`);

    await closeMongoDb();
  }
];

process.on('SIGINT', function() {
  console.log('Caught interrupt signal');

  forEach(destroy => {
    tryCatch(
      async () => {
        await destroy();
      },
      async err2 => {
        logger.error(`${err2.toString()}`, { error: err2 });
      }
    )();
  }, onDestroy);

  process.exit();
});

(async function() {
  try {
    logger.info(`Configuration: ${JSON.stringify(config)}`, { config });

    await listen('0.0.0.0', config.servicePort);

    initDb(config.mongoDbHost, config.mongoDbPort, config.mongoDbDatabase, config.mongoDbUser, config.mongoDbPassword);

    logger.debug(`Openning connection to mongoDb...`);

    await openMongoDb();

    //
    //
  } catch (err) {
    logger.error(`${err.toString()}`, { error: err });
  }
})();
