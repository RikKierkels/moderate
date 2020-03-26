import { call, put } from 'redux-saga/effects';
import { Idea } from '../shared/interfaces/idea.interface';
import {
  FETCH_IDEAS_FAILED,
  FETCH_IDEAS_REQUESTED,
  FETCH_IDEAS_SUCCEEDED,
  IdeaActionTypes
} from './types';
import * as IdeaAPi from './idea-api';

export function fetchIdeasRequest(): IdeaActionTypes {
  return {
    type: FETCH_IDEAS_REQUESTED
  };
}

function fetchIdeasSucceeded(ideas: Idea[]): IdeaActionTypes {
  return {
    type: FETCH_IDEAS_SUCCEEDED,
    payload: ideas
  };
}

function fetchIdeasFailed(errorMessage: string): IdeaActionTypes {
  return {
    type: FETCH_IDEAS_FAILED,
    payload: errorMessage
  };
}

export function* fetchIdeas() {
  try {
    const ideas = yield call(IdeaAPi.getAll);
    yield put(fetchIdeasSucceeded(ideas));
  } catch (e) {
    yield put(fetchIdeasFailed(e.message));
  }
}
