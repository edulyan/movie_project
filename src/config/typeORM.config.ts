import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ConfigPG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'movie-website',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  // keepConnectionAlive: true,
};

export default ConfigPG;
