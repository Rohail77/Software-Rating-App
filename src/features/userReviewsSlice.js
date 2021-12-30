import { createSlice } from '@reduxjs/toolkit';

const userReviewsSlice = createSlice({
  name: 'user_reviews',
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
      state.list = state.list.map(software =>
        software.id === action.payload.id ? action.payload : software
      );
    },
  },
});

export const { set, update } = userReviewsSlice.actions;

export default userReviewsSlice.reducer;
