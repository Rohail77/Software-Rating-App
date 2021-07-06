import { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import { db } from '../../database/Database';
import SoftwareDetails from './SoftwareDetails';
import Rate from '../rate/Rate';
import ReviewsRouter from '../reviews/ReviewsRouter';

class SoftwareDetailsRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      software: {},
      reviews: [],
      dataFetched: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    db.getSoftware(id, software => {
      this.setState({
        software,
      });
      db.getReviews(id, reviews => {
        this.setState({
          reviews,
          dataFetched: true,
        });
      });
    });
  }

  getReview(username) {}

  render() {
    const { dataFetched, software, reviews } = this.state;

    return dataFetched ? (
      <Switch>
        <Route
          path='/software_details/reviews/:id'
          render={() => <ReviewsRouter software={software} reviews={reviews} />}
        />
        <Route
          path='/software_details/rate/:id'
          exact
          render={() => <Rate software={software} />}
        />
        <Route
          path='/software_details/:id'
          exact
          render={() => (
            <SoftwareDetails software={software} reviews={reviews} />
          )}
        />
      </Switch>
    ) : null;
  }
}

export default SoftwareDetailsRouter;
