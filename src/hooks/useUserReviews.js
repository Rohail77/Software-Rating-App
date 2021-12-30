import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../database/User';
import { set } from '../features/userReviewsSlice';

function useUserReviews(loggedin) {
  const [reviews, fetched] = useSelector(state => [
    state.userReviews.list,
    state.userReviews.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedin && !fetched) {
      getUserReviews();
      user.bindUpdaterToReviews(getUserReviews);
    }
  }, [loggedin, fetched]);

  const getUserReviews = () =>
    user.getReviews(reviews => dispatch(set(reviews)));

  return [reviews, fetched, getUserReviews];
}

export default useUserReviews;
