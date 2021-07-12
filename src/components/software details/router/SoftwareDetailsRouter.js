import { Switch, Route } from 'react-router-dom';
import SoftwareDetailsPage from '../page/SoftwareDetailsPage';
import RatePageLogic from '../rate/page/RatePageLogic';
import ReviewsRouter from '../reviews/router/ReviewsRouter';

function SoftwareDetailsRouter(props) {
  const { reviews, software } = props;
  return (
    <Switch>
      <Route
        path='/software_details/:id/reviews'
        render={() => <ReviewsRouter software={software} reviews={reviews} />}
      />
      <Route
        path='/software_details/:id/rate'
        exact
        render={() => <RatePageLogic software={software} />}
      />
      <Route
        path='/software_details/:id'
        exact
        render={() => <SoftwareDetailsPage {...props} />}
      />
    </Switch>
  );
}

export default SoftwareDetailsRouter;
