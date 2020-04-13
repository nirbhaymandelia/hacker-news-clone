/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getUpVotedItems,
  unVoteItem,
  voteItem,
} from '../services/hackerNewsAPI';

const initialState = {
  items: [],
};

const voting = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    setUpVotedItemSuccess(state, action) {
      const { items } = action.payload;
      state.items = items;
      state.loading = false;
      state.error = null;
    },
    setUpVotedItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUpVotedItemSuccess, setUpVotedItemFailure } = voting.actions;

export const fetchVotedItems = () => async (dispatch) => {
  try {
    const items = await getUpVotedItems();
    dispatch(setUpVotedItemSuccess({ items }));
  } catch (err) {
    dispatch(setUpVotedItemFailure(err.message));
  }
};

export const vote = (item) => async (dispatch) => {
  try {
    const items = await voteItem(item);
    dispatch(setUpVotedItemSuccess({ items }));
  } catch (err) {
    dispatch(setUpVotedItemFailure(err.message));
  }
};

export const unVote = (item) => async (dispatch) => {
  try {
    const items = await unVoteItem(item);
    dispatch(setUpVotedItemSuccess({ items }));
  } catch (err) {
    dispatch(setUpVotedItemFailure(err.message));
  }
};

export default voting.reducer;
