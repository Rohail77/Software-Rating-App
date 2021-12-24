import { useState } from 'react';
import SoftwareInfo from './page components/software info/SoftwareInfo';
import ReviewsList from '../../common components/reviews/review list/ReviewsList';
import Pages from '../../../common/pages/Pages';
import RateLink from '../../common components/common links/RateLink';
import ReviewsInfo from './page components/reviews section/reviews info/ReviewsInfo';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';

function ReviewsPage(props) {
  const [state, setState] = useState({
    currentPage: 1,
    star: 'all',
    reviews: props.reviews,
  });

  const data = {
    reviewsPerPage: 12,
  };

  const updateCurrentPage = newPageNumber =>
    setState(state => ({
      ...state,
      currentPage: newPageNumber,
    }));

  const filterReviews = category => {
    const { reviews } = props;
    setState(state => ({
      ...state,
      reviews:
        category === 'all'
          ? reviews
          : reviews.filter(
              review => review.rating === Number.parseInt(category)
            ),
      currentPage: 1,
    }));
  };

  const getReviewsForCurrentPage = () => {
    const { reviews } = state;
    const { reviewsPerPage } = data;
    return reviews.slice(
      getInitialReviewIndexForCurrentPage(),
      getInitialReviewIndexForCurrentPage() + reviewsPerPage
    );
  };
  const getInitialReviewIndexForCurrentPage = () => {
    const { reviewsPerPage } = data;
    const { currentPage } = state;
    return (currentPage - 1) * reviewsPerPage;
  };

  const { software } = props;
  const { reviews } = state;
  const { reviewsPerPage } = data;

  return (
    <div className='wrapper reviews-wrapper'>
      <div className='breadcrumbs'>
        <HomeLink isActive={false} />
        <span> \ </span>
        <Link className='page-link' to={`/software_details/${software.id}`}>
          {software.name}
        </Link>
        <span> \ </span>
        <Link
          className='page-link active-page-link'
          to={`/software_details/${software.id}/reviews`}
        >
          Reviews
        </Link>
      </div>

      <SoftwareInfo name={software.name} developer={software.developer} />

      <section className='reviews'>
        <h2 className='reviews-heading'>Reviews</h2>
        <p className='ask-for-review-para'>Write a review by rating this app</p>

        <RateLink softwareID={software.id} />

        <ReviewsInfo
          filterReviews={filterReviews}
          total_reviews={reviews.length}
        />

        <ReviewsList
          reviews={getReviewsForCurrentPage()}
          softwareID={software.id}
        />
        {reviews.length === 0 ? null : (
          <Pages
            totalItems={reviews.length}
            itemsPerPage={reviewsPerPage}
            currentPage={state.currentPage}
            updateCurrentPage={updateCurrentPage}
          />
        )}
      </section>
    </div>
  );
}

export default ReviewsPage;
