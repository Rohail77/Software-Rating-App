import { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import SoftwareDetailsPage from '../page/SoftwareDetailsPage';
import Rate from '../rate/page/Rate';
import ReviewsRouter from '../reviews/router/ReviewsRouter';

class SoftwareDetailsRouter extends Component {
  render() {
    const { reviews, software } = this.props;

    return (
      <Switch>
        <Route
          path='/software_details/:id/reviews'
          render={() => <ReviewsRouter software={software} reviews={reviews} />}
        />
        <Route
          path='/software_details/:id/rate'
          exact
          render={() => <Rate software={software} />}
        />
        <Route
          path='/software_details/:id'
          exact
          render={() => <SoftwareDetailsPage {...this.props} />}
        />
      </Switch>
    );
  }
}

export default SoftwareDetailsRouter;
