import express from 'express';
import bodyParser from 'body-parser';
import client from 'prom-client';

import logger from './logger';
import routes from './routes/index';
import health from './health';

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/health', health);

app.get('/metrics', (req, res) => {
  res.send(client.register.metrics());
});

app.use('*', (req, res, next) => {
  res.sendStatus(404);

  next();
});

export function listen(host: string, port: number) {
  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, host, () => {
        logger.info(`Server listening on port ${port}`);

        resolve();
      })
      .on('error', err => reject(err));
  });
}

export default app;
