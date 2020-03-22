import { combineReducers } from 'redux';
import { ideaReducer } from './idea/reducers';

export const rootReducer = combineReducers({
  idea: ideaReducer
});

export type RootState = ReturnType<typeof rootReducer>;
