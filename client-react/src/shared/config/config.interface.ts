export interface Config {
  readonly api: ApiConfig;
  readonly idea: IdeaConfig;
  readonly auth: AuthConfig;
}

interface ApiConfig {
  readonly url: string;
}

interface IdeaConfig {
  readonly maxDifficulty: number;
}

interface AuthConfig {
  readonly domain: string;
  readonly clientId: string;
  readonly audience: string;
  readonly redirectUrl: string;
}
