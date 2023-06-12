import * as dotenv from 'dotenv';
dotenv.config();

export const APP_CONFIG = {
  PORT: process.env.PORT || 4000,
  SALT_PASS: process.env.SALT_PASS || 6,
  SYMMETRIC_KEY: process.env.SYMMETRIC_KEY,
  db_reading: {
    HOST: String(process.env.DB_HOST_READING) || 'localhost',
    USER: String(process.env.DB_USER_READING) || '',
    PORT: Number(process.env.DB_PORT_READING) || 5432,
    PASS: String(process.env.DB_PASS_READING) || '',
    DB: String(process.env.DATABASE_READING) || '',
  },
  db_writing: {
    HOST: String(process.env.DB_HOST_WRITING) || 'localhost',
    USER: String(process.env.DB_USER_WRITING) || '',
    PORT: Number(process.env.DB_PORT_WRITING) || 5432,
    PASS: String(process.env.DB_PASS_WRITING) || '',
    DB: String(process.env.DATABASE_WRITING) || '',
  },
};
