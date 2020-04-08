/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getHits } from '../services/hackerNewsAPI';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const hits = createSlice({
  name: 'hits',
  initialState,
  reducers: {
    getHitsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getHitsSuccess(state, action) {
      // eslint-disable-next-line no-shadow
      const { hits } = action.payload;
      state.items = hits;
      state.loading = false;
      state.error = null;
    },
    getHitsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getHitsStart, getHitsSuccess, getHitsFailure } = hits.actions;

export const fetchHits = () => async (dispatch) => {
  try {
    dispatch(getHitsStart());
    const data = await getHits();
    dispatch(getHitsSuccess({ hits: data.hits }));
  } catch (err) {
    dispatch(getHitsFailure(err));
  }
};

export default hits.reducer;
