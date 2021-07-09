import { Switch, Route } from 'react-router-dom';
import ReviewsPage from '../page/ReviewsPage';
import CompleteReview from '../complete review/page/CompleteReview';

function ReviewsRouter(props) {
  function getReview(username) {
    const { reviews } = props;
    return reviews.find(review => review.username === username);
  }

  const { software } = props;

  return (
    <Switch>
      <Route
        path='/software_details/:id/reviews'
        exact
        render={() => <ReviewsPage {...props} />}
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
              review={getReview(username)}
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

export default ReviewsRouter;
