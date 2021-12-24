import { useEffect, useState } from 'react';

import { softwares } from '../../../database/Softwares';
import SoftwareDetailsRouter from './SoftwareDetailsRouter';
import { user } from '../../../database/User';
import { CanUserReviewContext } from '../../../context/CanUserReviewContext';

function SoftwareDetailsRouterLogic(props) {
  const [state, setState] = useState({
    reviews: [],
    reviewsFetched: false,
    canUserReview: false,
  });

  const setCanUserReview = canUserReview => {
    const { id } = props.software;
    if (canUserReview) softwares.bindUpdaterToReview(id, getReviews);
    setState(state => ({
      ...state,
      canUserReview,
    }));
  };

  const getReviews = () => {
    waitForReviews();
    const { id } = props.software;
    softwares.getReviews(id, reviews =>
      setState(state => ({
        ...state,
        reviews,
        reviewsFetched: true,
      }))
    );
  };

  useEffect(() => {
    getReviews();
    const { id } = props.software;
    if (user.isSignedin())
      user.canReview(id).then(canUserReview => setCanUserReview(canUserReview));
  }, []);

  const waitForReviews = () =>
    setState(state => ({
      ...state,
      reviewsFetched: false,
    }));

  return (
    <CanUserReviewContext.Provider
      value={{
        canUserReview: state.canUserReview,
        setCanUserReview: setCanUserReview,
      }}
    >
      <SoftwareDetailsRouter {...props} {...state} />
    </CanUserReviewContext.Provider>
  );
}

export default SoftwareDetailsRouterLogic;
