import React, { Component } from 'react';
import RatedAppsPage from './RatedAppsPage';

class RatedAppsPageLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.data = {
      reviewsPerPage: 7,
    };
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  updateCurrentPage(newPageNumber) {
    this.setState({
      currentPage: newPageNumber,
    });
  }

  getReviewsForCurrentPage() {
    const { userReviews } = this.props;
    const { reviewsPerPage } = this.data;
    return userReviews.slice(
      this.getInitialReviewIndexForCurrentPage(),
      this.getInitialReviewIndexForCurrentPage() + reviewsPerPage
    );
  }
  getInitialReviewIndexForCurrentPage() {
    const { reviewsPerPage } = this.data;
    const { currentPage } = this.state;
    return (currentPage - 1) * reviewsPerPage;
  }

  render() {
    const { currentPage } = this.state;
    const { fetchingUserReviews, getUpdatedUserReviews, userReviews } =
      this.props;
    const { reviewsPerPage } = this.data;
    return (
      <RatedAppsPage
        reviewsPerPage={reviewsPerPage}
        totalReviews={userReviews.length}
        currentPage={currentPage}
        updateCurrentPage={this.updateCurrentPage}
        fetchingUserReviews={fetchingUserReviews}
        getUpdatedUserReviews={getUpdatedUserReviews}
        userReviews={this.getReviewsForCurrentPage()}
      />
    );
  }
}

export default RatedAppsPageLogic;
