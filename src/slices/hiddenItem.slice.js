/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getHiddenItems,
  hideItem as setHideItem,
} from '../services/hackerNewsAPI';

const initialState = {
  items: [],
};

const hiddenItems = createSlice({
  name: 'hiddenItems',
  initialState,
  reducers: {
    getHiddenItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getHiddenItemsSuccess(state, action) {
      const { items } = action.payload;
      state.items = items;
      state.loading = false;
      state.error = null;
    },
    getHiddenItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setHiddenItemSuccess(state, action) {
      const { items } = action.payload;
      state.items = items;
      state.error = null;
    },
    setHiddenItemFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  getHiddenItemsStart,
  getHiddenItemsSuccess,
  getHiddenItemsFailure,
  setHiddenItemSuccess,
  setHiddenItemFailure,
} = hiddenItems.actions;

export const fetchHiddenItems = () => async (dispatch) => {
  try {
    dispatch(getHiddenItemsStart());
    const items = await getHiddenItems();
    dispatch(getHiddenItemsSuccess({ items }));
  } catch (err) {
    dispatch(getHiddenItemsFailure(err.message));
  }
};

export const hideItem = (item) => async (dispatch) => {
  try {
    const items = await setHideItem(item);
    dispatch(setHiddenItemSuccess({ items }));
  } catch (err) {
    dispatch(setHiddenItemFailure(err.message));
  }
};

export default hiddenItems.reducer;
