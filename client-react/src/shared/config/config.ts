import { Config } from './config.interface';

const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:7000/api'
  },
  idea: {
    maxDifficulty: 5
  },
  auth: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || '',
    redirectUrl: process.env.REACT_APP_AUTH0_REDIRECT || ''
  }
};

export default config;
