import 'reflect-metadata';
import * as dotenv from 'dotenv';
import '../@config/container-service.config';
import '../@config/container-repository.config';
import '../application/university/seeds/seeds-university';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
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
    server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    server.use(GlobalFilterError);

    await AppDataSourceWriting.initialize();
    await AppDataSourceReading.initialize();

    server.listen(APP_CONFIG.PORT, () => Log());
  } catch (exception) {
    console.log('error starting project.', exception);
  }
};

(async () => {
  await boostrap();
})();

function Log() {
  console.log(
    `start project, PORT: ${APP_CONFIG.PORT}`,
    `documentation: http://localhost:${APP_CONFIG.PORT}/swagger/`,
  );
  console.warn(
    'Recomendo usar a documentação ou a collection do postman ( esta na pasta Docs: infra/docs ), para testar os endpois da api',
  );
}
