import { configureStore } from '@reduxjs/toolkit';
import softwaresReducer from '../features/softwaresSlice';
import userReviewsReducer from '../features/userReviewsSlice';

const store = configureStore({
  reducer: {
    softwares: softwaresReducer,
    userReviews: userReviewsReducer,
  },
});

export default store;
