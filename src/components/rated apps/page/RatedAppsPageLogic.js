import React, { useState } from 'react';
import RatedAppsPage from './RatedAppsPage';

function RatedAppsPageLogic(props) {
  const [state, setState] = useState({
    currentPage: 1,
  });

  const data = {
    reviewsPerPage: 7,
  };

  const updateCurrentPage = newPageNumber => {
    setState({
      currentPage: newPageNumber,
    });
  };

  const getReviewsForCurrentPage = () => {
    const { userReviews } = props;
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
  const { fetchingUserReviews, getUpdatedUserReviews, userReviews } = props;
  const { reviewsPerPage } = data;
  return (
    <RatedAppsPage
      reviewsPerPage={reviewsPerPage}
      totalReviews={userReviews.length}
      currentPage={currentPage}
      updateCurrentPage={updateCurrentPage}
      fetchingUserReviews={fetchingUserReviews}
      getUpdatedUserReviews={getUpdatedUserReviews}
      userReviews={getReviewsForCurrentPage()}
    />
  );
}

export default RatedAppsPageLogic;
