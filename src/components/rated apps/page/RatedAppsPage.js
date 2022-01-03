import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useUserReviews from '../../../hooks/useUserReviews';
import HomeLink from '../../common/home link/HomeLink';
import Pages from '../../common/pages/Pages';
import NoRatingsMessage from './page components/no ratings message/NoRatingsMessage';
import PastRatingsList from './page components/past ratings list/PastRatingsList';

const REVIEWS_PER_PAGE = 7;

function RatedAppsPage(props) {
  const [userReviews, fetchedUserReviews, getUpdatedUserReviews] =
    useUserReviews(true);

  const [userReviewsForCurrentPage, pagination] = usePagination(
    userReviews,
    REVIEWS_PER_PAGE
  );

  return (
    <div className='wrapper rated-apps-wrapper'>
      <header>
        <div className='breadcrumbs'>
          <HomeLink />
          <span> \ </span>
          <Link className='page-link active-page-link' to='/rated_apps'>
            Rated Apps
          </Link>
        </div>
      </header>
      {userReviews.length === 0 ? (
        <NoRatingsMessage />
      ) : (
        <>
          <h1 className='ratings-h'>Your Ratings</h1>
          <PastRatingsList
            userReviews={userReviewsForCurrentPage}
            getUpdatedUserReviews={getUpdatedUserReviews}
            fetchedUserReviews={fetchedUserReviews}
          />
          <Pages {...pagination} />
        </>
      )}
    </div>
  );
}

export default RatedAppsPage;
