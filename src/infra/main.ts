import 'reflect-metadata';
import * as dotenv from 'dotenv';
import '../@config/container-service.config';
import '../@config/container-repository.config';
import '../infra/database/redis';

import express from 'express';
import { AppDataSourceWriting } from './database/writing';
import { AppDataSourceReading } from './database/reading';
import { APP_CONFIG } from '../@config/environment.config';
import AppRoutes from './http/routes';
import { GlobalFilterError } from './http/filters/goblal-error.filter';
import Redis from './database/redis';
import client from './database/redis';

const boostrap = async () => {
  try {
    dotenv.config();
    const server = express();
    server.use(express.json());
    server.use(AppRoutes);
    server.use(GlobalFilterError);

    await AppDataSourceWriting.initialize();
    await AppDataSourceReading.initialize();
    await client.set('key', 'value');
    const ts = await client.get('key');
    console.log(ts);
    client.on('connect', () => {
      console.log('Connection redis sucesso!');
    });

    client.on('error', (err) => {
      console.error('Error Redis:', err);
    });

    server.listen(APP_CONFIG.PORT, () =>
      console.log('start project, PORT:', APP_CONFIG.PORT),
    );
  } catch (exception) {
    console.log('error starting project.', exception);
  }
};

(async () => {
  await boostrap();
})();
