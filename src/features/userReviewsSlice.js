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
    update: (state, action) => {
      state.list = state.list.map(review =>
        review.id === action.payload.id ? action.payload : review
      );
    },
  },
});

export const { set, update } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;
