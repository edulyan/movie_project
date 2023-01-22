import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const ConfigPG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'movie-website',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: ['error', 'warn'],
  // cache: { type: 'redis' },
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  // keepConnectionAlive: true,
};

export default ConfigPG;
