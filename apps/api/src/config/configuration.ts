import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface Configuration {
  port: number;
  auth: AuthConfiguration;
  database: PostgresConnectionOptions;
}

interface AuthConfiguration {
  audience: string;
  domain: string;
}

export default (): Configuration => ({
  port: parseInt(process.env.de, 10) || 7000,
  auth: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true'
  }
});
