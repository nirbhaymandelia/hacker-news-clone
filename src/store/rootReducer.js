import { combineReducers } from '@reduxjs/toolkit';

import commentsReducer from '../pages/Comments/comments.slice';
import topStoriesReducer from '../pages/Front/topStories.slice';
import latestStoriesReducer from '../pages/Latest/latestStories.slice';

// import upVoteReducer from 'features/repoSearch/repoDetailsSlice'

const rootReducer = combineReducers({
  topStories: topStoriesReducer,
  latestStories: latestStoriesReducer,
  comments: commentsReducer,
  // upVote: upVoteReducer
});

export default rootReducer;
