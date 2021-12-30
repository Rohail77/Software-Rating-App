import React, { useState } from 'react';
import RatedAppsPage from './RatedAppsPage';
import useUserReviews from '../../../hooks/useUserReviews';

function RatedAppsPageLogic(props) {
  const [state, setState] = useState({
    currentPage: 1,
  });

  const [userReviews, fetchedUserReviews, getUpdatedUserReviews] =
    useUserReviews(true);

  const data = {
    reviewsPerPage: 7,
  };

  const updateCurrentPage = newPageNumber => {
    setState({
      currentPage: newPageNumber,
    });
  };

  const getReviewsForCurrentPage = () => {
    const { reviewsPerPage } = data;
    return userReviews.slice(
      getInitialReviewIndexForCurrentPage(),
      getInitialReviewIndexForCurrentPage() + reviewsPerPage
    );
  };

  const getInitialReviewIndexForCurrentPage = () => {
    const { reviewsPerPage } = data;
    const { currentPage } = state;
    return (currentPage - 1) * reviewsPerPage;
  };

  const { currentPage } = state;
  const { reviewsPerPage } = data;
  return (
    <RatedAppsPage
      reviewsPerPage={reviewsPerPage}
      totalReviews={userReviews.length}
      currentPage={currentPage}
      updateCurrentPage={updateCurrentPage}
      fetchedUserReviews={fetchedUserReviews}
      getUpdatedUserReviews={getUpdatedUserReviews}
      userReviews={getReviewsForCurrentPage()}
    />
  );
}

export default RatedAppsPageLogic;
