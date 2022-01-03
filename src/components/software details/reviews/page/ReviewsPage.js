import { useState } from 'react';
import SoftwareInfo from './page components/software info/SoftwareInfo';
import ReviewsList from '../../common components/reviews/review list/ReviewsList';
import Pages from '../../../common/pages/Pages';
import RateLink from '../../common components/common links/RateLink';
import ReviewsInfo from './page components/reviews section/reviews info/ReviewsInfo';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';
import usePagination from '../../../../hooks/usePagination';

const REVIEWS_PER_PAGE = 12;

function ReviewsPage({ reviews, software }) {
  const [state, setState] = useState({
    category: 'all',
  });

  const filteredReviews = () =>
    state.category === 'all'
      ? reviews
      : reviews.filter(
          review => review.rating === Number.parseInt(state.category)
        );

  const [reviewsForCurrentPage, pagination] = usePagination(
    filteredReviews(),
    REVIEWS_PER_PAGE
  );

  const setCategory = category =>
    setState(state => ({
      ...state,
      category,
    }));

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
          filterReviews={setCategory}
          total_reviews={filteredReviews().length}
        />

        <ReviewsList reviews={reviewsForCurrentPage} softwareID={software.id} />
        <Pages {...pagination} />
      </section>
    </div>
  );
}

export default ReviewsPage;
