import { Idea } from '../../shared/interfaces/idea.interface';

export interface IdeaState {
  readonly ideas: Idea[];
  readonly errorMessage: string;
}

export const FETCH_IDEAS_REQUESTED = 'FETCH_IDEAS_REQUESTED';
export const FETCH_IDEAS_SUCCEEDED = 'FETCH_IDEAS_SUCCEEDED';
export const FETCH_IDEAS_FAILED = 'FETCH_IDEAS_FAILED';

interface FetchIdeasAction {
  type: typeof FETCH_IDEAS_REQUESTED;
}

interface FetchIdeasSucceededAction {
  type: typeof FETCH_IDEAS_SUCCEEDED;
  payload: Idea[];
}

interface FetchIdeasFailedAction {
  type: typeof FETCH_IDEAS_FAILED;
  payload: string;
}

export type IdeaActionTypes =
  | FetchIdeasAction
  | FetchIdeasSucceededAction
  | FetchIdeasFailedAction;
