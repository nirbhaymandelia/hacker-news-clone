/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getTopStories } from '../../services/hackerNewsAPI';

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
};

const topStories = createSlice({
  name: 'topStories',
  initialState,
  reducers: {
    getTopStoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTopStorySuccess(state, action) {
      // eslint-disable-next-line no-shadow
      const { hits, nbPages, page } = action.payload;
      state.items = hits;
      state.loading = false;
      state.error = null;
      state.totalPages = nbPages;
      state.currentPage = page;
    },
    getTopStoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTopStoryStart,
  getTopStorySuccess,
  getTopStoryFailure,
} = topStories.actions;

export const fetchTopStories = (params) => async (dispatch) => {
  try {
    dispatch(getTopStoryStart());
    const data = await getTopStories(params);
    const { hits, nbPages, page } = data;
    dispatch(getTopStorySuccess({ hits, nbPages, page }));
  } catch (err) {
    dispatch(getTopStoryFailure(err));
  }
};

export default topStories.reducer;
