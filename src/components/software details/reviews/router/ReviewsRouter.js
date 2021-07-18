import { Switch, Route } from 'react-router-dom';
import ReviewsPage from '../page/ReviewsPage';
import CompleteReview from '../complete review/page/CompleteReview';

function ReviewsRouter(props) {
  function getReview(id) {
    const { reviews } = props;
    return reviews.find(review => review.id === id);
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

      {/* <Route
        path='/software_details/:id/review/:username'
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
      /> */}
    </Switch>
  );
}

export default ReviewsRouter;
