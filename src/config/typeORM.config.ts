import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ConfigPG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgresMovieSite',
  port: 5432,
  username: 'edgar',
  password: '20012002',
  database: 'movie-website',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  // keepConnectionAlive: true,
};

export default ConfigPG;
