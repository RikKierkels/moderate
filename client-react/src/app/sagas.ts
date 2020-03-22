import { takeLatest } from 'redux-saga/effects';
import { FETCH_IDEAS_REQUESTED } from '../idea/types';
import { fetchIdeas } from '../idea/actions';

function* mySaga() {
  yield takeLatest(FETCH_IDEAS_REQUESTED, fetchIdeas);
}

export default mySaga;
