import 'reflect-metadata';
import * as dotenv from 'dotenv';
import '../../@config/container-service.config';
import '../../@config/container-repository.config';

import express from 'express';
import { AppDataSourceWriting } from '../database/writing';
import { AppDataSourceReading } from '../database/reading';
import { APP_CONFIG } from '../../@config/environment.config';
import AppRoutes from './routes';
import { GlobalFilterError } from './filters/goblal-error.filter';

const boostrap = async () => {
  try {
    dotenv.config();
    const server = express();
    server.use(express.json());
    server.use(AppRoutes);
    server.use(GlobalFilterError);
    // server.use("/test", async (rq, rs) => {
    //   try {
    //     const dto = new CreateUniversityDto();
    //     dto.name = "asdasda";
    //
    //     await dto.isValid();
    //   } catch (e) {
    //     console.log(e);
    //   }
    //
    //   const rep = new UniversityRepository();
    //
    //   const un = new University();
    //   un.name = "XPTO";
    //   un.domain = [""];
    //   un.countryCode = "XPTO";
    //   un.stateProvince = "XPTO";
    //   un.country = "XPTO";
    //   un.webPages = [""];
    //   const ts = await rep.create(un);
    //
    //   rs.send(ts);
    // });

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
