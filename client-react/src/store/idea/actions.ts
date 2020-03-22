import { call, put } from 'redux-saga/effects';
import { Idea } from '../../shared/interfaces/idea.interface';
import {
  FETCH_IDEAS_REQUESTED,
  FETCH_IDEAS_SUCCEEDED,
  FETCH_IDEAS_FAILED,
  IdeaActionTypes
} from './types';
import config from '../../shared/config/config';

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

async function getIdeas(): Promise<Idea[] | Error> {
  try {
    const response = await fetch(`${config.api.url}/ideas`);
    return await response.json();
  } catch {
    throw new Error('Something went wrong while fetching the ideas.');
  }
}

export function* fetchIdeas() {
  try {
    const ideas = yield call(getIdeas);
    yield put(fetchIdeasSucceeded(ideas));
  } catch (e) {
    yield put(fetchIdeasFailed(e.message));
  }
}
