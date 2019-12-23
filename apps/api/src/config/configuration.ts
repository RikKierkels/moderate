export default () => ({
  port: parseInt(process.env.de, 10) || 3333,
  auth: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true'
  }
});
