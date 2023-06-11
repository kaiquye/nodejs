import 'reflect-metadata';
import * as dotenv from 'dotenv';
import '../@config/container-service.config';
import '../@config/container-repository.config';

import express from 'express';
import { AppDataSourceWriting } from './database/writing';
import { AppDataSourceReading } from './database/reading';
import { APP_CONFIG } from '../@config/environment.config';
import AppRoutes from './http/routes';
import { GlobalFilterError } from './http/filters/goblal-error.filter';

const boostrap = async () => {
  try {
    dotenv.config();
    const server = express();
    server.use(express.json());
    server.use(AppRoutes);
    server.use(GlobalFilterError);

    await AppDataSourceWriting.initialize();
    await AppDataSourceReading.initialize();
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
