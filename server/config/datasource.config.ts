import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

export function getConfig() {
  if (!['qa', 'prod'].includes(process.env.NODE_ENV)) {
    dotenv.config();
  }

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    autoLoadEntities: false,
    cli: {
      entitiesDir: 'src/models',
      migrationsDir: 'database/migrations',
    },
  } as DataSourceOptions;
}
