import { Component} from 'react';

import { Switch, Route } from 'react-router-dom';
import { db } from '../../database/Database';
import SoftwareDetails from './SoftwareDetails';
import Reviews from '../reviews/Reviews';

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

  render() {
    const { dataFetched, software, reviews } = this.state;

    return dataFetched ? (
      <Switch>
        <Route
          path='/software_details/:id'
          exact
          render={() => (
            <SoftwareDetails software={software} reviews={reviews} />
          )}
        />
        <Route
          path='/software_details/reviews/:id'
          exact
          render={() => <Reviews software={software} reviews={reviews} />}
        />
      </Switch>
    ) : null;
  }
}

export default SoftwareDetailsRouter;
