import { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import Reviews from '../page/Reviews';
import CompleteReview from '../complete review/page/CompleteReview';

class ReviewsRouter extends Component {
  getReview(username) {
    const { reviews } = this.props;

    return reviews.find(review => review.username === username);
  }

  render() {
    const { software } = this.props;

    return (
      <Switch>
        <Route
          path='/software_details/:id/reviews'
          exact
          render={() => <Reviews {...this.props} />}
        />
        <Route
          path='/software_details/:id/reviews/review/:username'
          exact
          render={props => {
            const { username } = props.match.params;
            const { fromSoftwareDetailsPage } = props.location.state;
            return (
              <CompleteReview
                software={software}
                review={this.getReview(username)}
                fromSoftwareDetailsPage={
                  fromSoftwareDetailsPage ? fromSoftwareDetailsPage : false
                }
              />
            );
          }}
        />
      </Switch>
    );
  }
}

export default ReviewsRouter;
