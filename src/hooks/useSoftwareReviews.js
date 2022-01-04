import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../database/Softwares';
import { set } from '../features/softwareReviewsSlice';

function useSoftwareReviews(softwareId) {
  const [reviews, fetched] = useSelector(state => [
    state.softwareReviews.list,
    state.softwareReviews.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) fetchReviews();
  }, [fetched]);

  const fetchReviews = async () => {
    const reviews = await getReviews(softwareId);
    dispatch(set(reviews));
  };

  return [reviews, fetched];
}

export default useSoftwareReviews;
