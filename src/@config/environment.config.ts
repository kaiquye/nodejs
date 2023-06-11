import * as dotenv from 'dotenv';
dotenv.config();

export const APP_CONFIG = {
  PORT: process.env.PORT || 4000,
  SALT_PASS: process.env.SALT_PASS || 6,
  SYMMETRIC_KEY: process.env.SYMMETRIC_KEY,
  db_reading: {
    HOST: String(process.env.DB_HOST) || 'localhost',
    USER: String(process.env.DB_USER) || '',
    PORT: Number(process.env.DB_PORT) || 5432,
    PASS: String(process.env.DB_PASS) || '',
    DB: String(process.env.DATABASE) || '',
  },
  db_writing: {
    HOST: String(process.env.DB_HOST) || 'localhost',
    USER: String(process.env.DB_USER) || '',
    PORT: Number(process.env.DB_PORT) || 5432,
    PASS: String(process.env.DB_PASS) || '',
    DB: String(process.env.DATABASE) || '',
  },
};
