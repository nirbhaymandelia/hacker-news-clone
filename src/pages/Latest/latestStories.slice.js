/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getLatestStories } from '../../services/hackerNewsAPI';

const initialState = {
  items: [],
  totalPages: 0,
  currentPage: 0,
  loading: false,
  error: null,
};

const latestStories = createSlice({
  name: 'latestStories',
  initialState,
  reducers: {
    getLatestStoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getLatestStorySuccess(state, action) {
      const { hits, nbPages, page } = action.payload;
      state.items = hits;
      state.loading = false;
      state.error = null;
      state.totalPages = nbPages;
      state.currentPage = page;
    },
    getLatestStoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getLatestStoryStart,
  getLatestStorySuccess,
  getLatestStoryFailure,
} = latestStories.actions;

export const fetchLatestStories = (
  match,
  withCaching = (fn, params) => fn(params)
) => async (dispatch) => {
  const { params } = match;
  params.page = params.page || 0;
  try {
    dispatch(getLatestStoryStart());
    const { hits, nbPages, page } = await withCaching(getLatestStories, params);
    dispatch(getLatestStorySuccess({ hits, nbPages, page }));
  } catch (err) {
    dispatch(getLatestStoryFailure(err.message));
  }
};

export default latestStories.reducer;
