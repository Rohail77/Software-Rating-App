import { Link } from 'react-router-dom';
import { UserReviewsContext } from '../../context/UserReviewsContext';
import HomeLink from '../common/home link/HomeLink';
import NoReviewsMessage from './no reviews message/NoReviewsMessage';
import PastReviews from './past reviews list/PastReviews';

function EditReviewsPage() {

  return (
    <div className='wrapper edit-reviews-wrapper'>
      <header>
        <div className='breadcrumbs'>
          <HomeLink />
          <span> \ </span>
          <Link className='page-link active-page-link' to='/edit_reviews'>
            Your ratings
          </Link>
        </div>
      </header>
      <h1 className='ratings-h'>Your Ratings</h1>

      <UserReviewsContext.Consumer>
        {value => {
          return value.userReviews.length === 0 ? (
            <NoReviewsMessage />
          ) : (
            <PastReviews {...value} />
          );
        }}
      </UserReviewsContext.Consumer>
    </div>
  );
}

export default EditReviewsPage;
