import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Collection } from 'mongodb';

import { getDb } from '../db';
import { Request as BaseRequest } from './index';
// import * as clientsService from '../services/clients';
import * as releasesService from '../services/releases';

const router = express.Router();

router.get('/', async (req, res) => {
  const { application, timestampStart, timestampEnd } = req.query;

  const releases = await releasesService.find(
    application,
    timestampStart ? new Date(timestampStart) : null,
    timestampEnd ? new Date(timestampEnd) : null
  );

  res.json(releases);
});

router.get('/:application/:version', async (req, res) => {
  const { application, version } = req.params;

  const release = await releasesService.findOne(application, version);

  res.json(release);
});

router.post('/', async (req, res) => {
  const { body } = req as {
    body: {
      timestamp: string;
      application: string;
      version: string;
    };
  };

  const release = await releasesService.create(
    body.timestamp ? new Date(body.timestamp) : null,
    body.application,
    body.version
  );

  res.json({ id: release._id });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await releasesService.deleteOneById(id);

  res.sendStatus(200);
});

router.delete('/:application/:version', async (req, res) => {
  const { application, version } = req.params;

  await releasesService.deleteOne(application, version);

  res.sendStatus(200);
});

export default router;
