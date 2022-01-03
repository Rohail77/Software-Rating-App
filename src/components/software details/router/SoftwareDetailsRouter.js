import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { reset } from '../../../features/softwareReviewsSlice';
import SoftwareDetailsPage from '../page/SoftwareDetailsPage';
import RatePageLogic from '../rate/page/RatePageLogic';
import ReviewsRouter from '../reviews/router/ReviewsRouter';

function SoftwareDetailsRouter(props) {
  const { software } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <Switch>
      <Route
        path='/software_details/:id/reviews'
        render={() => <ReviewsRouter software={software} />}
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
