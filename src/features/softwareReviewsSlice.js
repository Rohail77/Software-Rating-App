import { createSlice } from '@reduxjs/toolkit';
import { softwares } from '../database/Softwares';

const softwareReviewsSlice = createSlice({
  name: 'software-reviews',
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
        review.id === action.payload.id ? action.payload : review
      );
    },
    reset: state => {
      state.list = [];
      state.fetched = false;
    },
  },
});

export const requestAddUserReview = softwareId => {
  const { add } = softwareReviewsSlice.actions;
  return async dispatch => {
    const review = await softwares.myReview(softwareId);
    dispatch(add(review));
  };
};

export const { set, add, update, reset } = softwareReviewsSlice.actions;

export default softwareReviewsSlice.reducer;
