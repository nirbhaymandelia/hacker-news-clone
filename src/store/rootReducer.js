import { combineReducers } from '@reduxjs/toolkit'

import commentsReducer from '../components/pages/Comments/commentsSlice'
import newsReducer from '../components/pages/News/newsSlice'
// import upVoteReducer from 'features/repoSearch/repoDetailsSlice'


const rootReducer = combineReducers({
  news: newsReducer,
  comments: commentsReducer,
  // upVote: upVoteReducer
})


export default rootReducer
