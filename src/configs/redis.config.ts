import { config } from 'dotenv';

config();

export const getRedisConfig = () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});
