import { Link } from 'react-router-dom';
import HomeLink from '../common/home link/HomeLink';
import PastReviews from './past reviews list/PastReviews'

function EditReviewsPage() {
  return (
    <div className='wrapper edit-reviews-wrapper'>
      <header>
        <div className='breadcrumbs'>
          <HomeLink />
          <span> \ </span>
          <Link className='page-link active-page-link' to='/reviews_history'>
            Your ratings
          </Link>
        </div>
      </header>
      <h1 className='ratings-h'>Your Ratings</h1>
      <PastReviews />
    </div>
  );
}

export default EditReviewsPage;
