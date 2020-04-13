import { combineReducers } from '@reduxjs/toolkit';

// import commentsReducer from '../slices/comments.slice';
import topStoriesReducer from '../slices/topStories.slice';
import latestStoriesReducer from '../slices/latestStories.slice';
import votingReducer from '../slices/voting.slice';
import hiddenItemsReducer from '../slices/hiddenItem.slice';

const rootReducer = combineReducers({
  topStories: topStoriesReducer,
  latestStories: latestStoriesReducer,
  votedItems: votingReducer,
  hiddenItems: hiddenItemsReducer,
  // comments: commentsReducer,
});

export default rootReducer;
