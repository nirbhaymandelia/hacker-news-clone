import { combineReducers } from '@reduxjs/toolkit';

import commentsReducer from '../slices/commentsSlice';
import newsReducer from '../slices/hitsSlice';
// import upVoteReducer from 'features/repoSearch/repoDetailsSlice'

const rootReducer = combineReducers({
  news: newsReducer,
  comments: commentsReducer,
  // upVote: upVoteReducer
});

export default rootReducer;
