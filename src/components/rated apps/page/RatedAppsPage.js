import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HomeLink from '../../common/home link/HomeLink';
import Pages from '../../common/pages/Pages';
import NoRatingsMessage from './page components/no ratings message/NoRatingsMessage';
import PastRatingsList from './page components/past ratings list/PastRatingsList';

function RatedAppsPage(props) {
  const {
    userReviews,
    fetchedUserReviews,
    getUpdatedUserReviews,
    reviewsPerPage,
    currentPage,
    updateCurrentPage,
    totalReviews,
  } = props;
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
        <Fragment>
          <h1 className='ratings-h'>Your Ratings</h1>
          <PastRatingsList
            userReviews={userReviews}
            getUpdatedUserReviews={getUpdatedUserReviews}
            fetchedUserReviews={fetchedUserReviews}
          />
          <Pages
            totalItems={totalReviews}
            itemsPerPage={reviewsPerPage}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
          />
        </Fragment>
      )}{' '}
    </div>
  );
}

export default RatedAppsPage;
