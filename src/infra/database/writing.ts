import { DataSource } from 'typeorm';
import { APP_CONFIG } from '../../@config/environment.config';
import { Universities1686256688533 } from './migrations/1686256688533-universities';
import * as dotenv from 'dotenv';
import { University } from '../../domain/models/university.model';
import { User } from '../../domain/models/user.model';
import { User1686440561556 } from './migrations/1686440561556-user';
dotenv.config();
export const AppDataSourceWriting = new DataSource({
  type: 'postgres',
  host: APP_CONFIG.db_writing.HOST,
  port: APP_CONFIG.db_writing.PORT,
  username: APP_CONFIG.db_writing.USER,
  password: APP_CONFIG.db_writing.PASS,
  database: APP_CONFIG.db_writing.DB,
  migrations: [Universities1686256688533, User1686440561556],
  entities: [University, User],
  migrationsRun: true,
});

export const Writing = AppDataSourceWriting.createQueryRunner();
