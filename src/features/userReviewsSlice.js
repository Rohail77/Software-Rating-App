import { createSlice } from '@reduxjs/toolkit';

const userReviewsSlice = createSlice({
  name: 'user-reviews',
  initialState: {
    list: [],
    fetched: false,
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload;
      state.fetched = true;
    },
    add: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    update: (state, action) => {
      state.list = state.list.map(review =>
        review.softwareId === action.payload.softwareId
          ? action.payload
          : review
      );
    },
    remove: (state, action) => {
      state.list = state.list.filter(
        review => review.softwareId !== action.payload
      );
    },
  },
});

export const { set, update, add, remove } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;
