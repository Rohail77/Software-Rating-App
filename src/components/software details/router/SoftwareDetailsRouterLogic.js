import { Component } from 'react';
import { GetReviewsContext } from '../../../context/GetReviewsContext';

import { db } from '../../../database/Database';
import SoftwareDetailsRouter from './SoftwareDetailsRouter';
import { user } from '../../../database/User';
import {CanUserReviewContext} from '../../../context/CanUserReviewContext';

class SoftwareDetailsRouterLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsFetched: false,
      canUserReview: false,
    };
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.canUserReview();
  }

  getReviews() {
    this.waitForReviews();
    const { id } = this.props.software;
    db.getReviews(id, reviews => {
      this.setState({
        reviews,
        reviewsFetched: true,
      });
    });
  }

  canUserReview() {
    const { id } = this.props.software;
    user.canReview(id, canUserReview => {
      console.log(canUserReview);
      this.setState({
        canUserReview,
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
      <GetReviewsContext.Provider value={this.getReviews}>
        <CanUserReviewContext.Provider value={this.state.canUserReview}>
          <SoftwareDetailsRouter {...this.props} {...this.state} />
        </CanUserReviewContext.Provider>
      </GetReviewsContext.Provider>
    );
  }
}

export default SoftwareDetailsRouterLogic;
