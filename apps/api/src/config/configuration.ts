import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { Idea } from '../app/idea/idea.entity';
import { Tag } from '../app/tag/tag.entity';
import { Message } from '../app/message/message.entity';

interface Configuration {
  port: number;
  isProduction: boolean;
  auth: AuthConfiguration;
  database: PostgresConnectionOptions;
}

interface AuthConfiguration {
  audience: string;
  domain: string;
}

export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 7000,
  isProduction: process.env.PRODUCTION === 'true',
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

export const getDatabaseConfig = (config: ConfigService) => {
  return {
    ...config.get<PostgresConnectionOptions>('database'),
    entities: [Idea, Tag, Message]
  };
};
