import { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import Reviews from '../reviews/Reviews';
import CompleteReview from '../reviews/review/CompleteReview';

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
          path='/software_details/reviews/:id'
          exact
          render={() => <Reviews {...this.props} />}
        />
        <Route
          path='/software_details/reviews/review/:username'
          exact
          render={props => {
            const { username } = props.match.params;
            return <CompleteReview
              software={software}
              review={this.getReview(username)}
            />;
          }}
        />
      </Switch>
    );
  }
}

export default ReviewsRouter;
