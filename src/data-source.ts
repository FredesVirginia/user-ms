import { DataSource } from 'typeorm';

import { Review } from './users/entity/review.entity';
import { User } from './users/entity/user.entity';
import * as dotenv from 'dotenv';
import { Somting } from './users/entity/some.entity';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [User, Review , Somting],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
