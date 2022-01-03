import { Switch, Route } from 'react-router-dom';
import ReviewsPage from '../page/ReviewsPage';
import CompleteReview from '../complete review/page/CompleteReview';
import useSoftwareReviews from '../../../../hooks/useSoftwareReviews';

function ReviewsRouter(props) {
  const [reviews] = useSoftwareReviews(props.software.id);

  const getReview = id => reviews.find(review => review.id === id);

  const { software } = props;

  return (
    <Switch>
      <Route
        path='/software_details/:id/reviews'
        exact
        render={() => <ReviewsPage {...props} reviews={reviews} />}
      />
      <Route
        path='/software_details/:id/reviews/:userID'
        exact
        render={props => {
          const { userID } = props.match.params;
          const { fromSoftwareDetailsPage, noReviewsPage } =
            props.location.state;
          return (
            <CompleteReview
              software={software}
              review={getReview(userID)}
              fromSoftwareDetailsPage={
                fromSoftwareDetailsPage ? fromSoftwareDetailsPage : false
              }
              noReviewsPage={noReviewsPage ? noReviewsPage : false}
            />
          );
        }}
      />
    </Switch>
  );
}

export default ReviewsRouter;
