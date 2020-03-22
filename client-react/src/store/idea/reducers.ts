import {
  FETCH_IDEAS_FAILED,
  FETCH_IDEAS_REQUESTED,
  FETCH_IDEAS_SUCCEEDED,
  IdeaActionTypes,
  IdeaState
} from './types';

const initialState: IdeaState = { ideas: [], errorMessage: '' };

export function ideaReducer(
  state = initialState,
  action: IdeaActionTypes
): IdeaState {
  switch (action.type) {
    case FETCH_IDEAS_REQUESTED:
      return { ...state };
    case FETCH_IDEAS_SUCCEEDED:
      return { ...state, ideas: action.payload };
    case FETCH_IDEAS_FAILED:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
