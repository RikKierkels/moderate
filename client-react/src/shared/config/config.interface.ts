export interface Config {
  readonly api: ApiConfig;
  readonly idea: IdeaConfig;
}

interface ApiConfig {
  readonly url: string;
}

interface IdeaConfig {
  readonly maxDifficulty: number;
}
