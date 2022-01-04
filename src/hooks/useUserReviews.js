import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews } from '../database/User';
import { set } from '../features/userReviewsSlice';

function useUserReviews(loggedin) {
  const [reviews, fetched] = useSelector(state => [
    state.userReviews.list,
    state.userReviews.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedin && !fetched) {
      userReviews();
    }
  }, [loggedin, fetched]);

  const userReviews = async () => {
    const reviews = await getUserReviews();
    dispatch(set(reviews));
  };

  return [reviews, fetched, userReviews];
}

export default useUserReviews;
