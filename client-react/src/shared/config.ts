interface ApiConfig {
  readonly url: string;
}

interface IdeaConfig {
  readonly maxDifficulty: number;
}

interface Config {
  readonly api: ApiConfig;
  readonly idea: IdeaConfig;
}

const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:7000/api'
  },
  idea: {
    maxDifficulty: 5
  }
};

export default config;
