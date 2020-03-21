import { Config } from './config.interface';

const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:7000/api'
  },
  idea: {
    maxDifficulty: 5
  }
};

export default config;
