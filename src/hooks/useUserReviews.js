import { useEffect, useState } from 'react';
import { user } from '../database/User';

function useUserReviews(loggedin) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (loggedin) {
      getUserReviews();
      user.bindUpdaterToReviews(getUserReviews);
    }
  }, [loggedin]);

  const getUserReviews = () => user.getReviews(reviews => setState(reviews));

  return state ? [state, getUserReviews, true] : [[], getUserReviews, false];
}

export default useUserReviews;
