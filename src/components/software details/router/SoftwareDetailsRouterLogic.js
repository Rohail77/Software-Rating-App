import { Component } from 'react';

import { softwares } from '../../../database/Softwares';
import SoftwareDetailsRouter from './SoftwareDetailsRouter';
import { user } from '../../../database/User';
import { CanUserReviewContext } from '../../../context/CanUserReviewContext';

class SoftwareDetailsRouterLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsFetched: false,
      canUserReview: false,
    };
    this.getReviews = this.getReviews.bind(this);
    this.setCanUserReview = this.setCanUserReview.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    const { id } = this.props.software;
    if (user.isSignedin())
      user
        .canReview(id)
        .then(canUserReview => this.setCanUserReview(canUserReview));
  }

  setCanUserReview(canUserReview) {
    const { id } = this.props.software;
    if (canUserReview) softwares.bindUpdaterToReview(id, this.getReviews);
    this.setState({
      canUserReview,
    });
  }

  getReviews() {
    this.waitForReviews();
    const { id } = this.props.software;
    softwares.getReviews(id, reviews => {
      this.setState({
        reviews,
        reviewsFetched: true,
      });
    });
  }

  waitForReviews() {
    this.setState({
      reviewsFetched: false,
    });
  }

  render() {
    return (
      <CanUserReviewContext.Provider
        value={{
          canUserReview: this.state.canUserReview,
          setCanUserReview: this.setCanUserReview,
        }}
      >
        <SoftwareDetailsRouter {...this.props} {...this.state} />
      </CanUserReviewContext.Provider>
    );
  }
}

export default SoftwareDetailsRouterLogic;
