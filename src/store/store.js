import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import softwaresReducer from '../features/softwaresSlice';
import userReviewsReducer from '../features/userReviewsSlice';

const store = configureStore({
  reducer: {
    softwares: softwaresReducer,
    userReviews: userReviewsReducer,
    loggedin: authSlice,
  },
});

export default store;
