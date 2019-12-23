export default () => ({
  port: parseInt(process.env.de, 10) || 3333,
  auth: {
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN
  }
});
