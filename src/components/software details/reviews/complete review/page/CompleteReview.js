import Review from '../../../common components/reviews/review list/Review';
import SoftwareBasicInfo from '../../../../common/software basic info/SoftwareBasicInfo';
import { Link } from 'react-router-dom';
import HomeLink from '../../../../common/home link/HomeLink';
import { Fragment } from 'react';

function CompleteReview({
  review,
  fromSoftwareDetailsPage,
  software,
  noReviewsPage,
}) {
  const { name, developer, id } = software;
  return (
    <div className='wrapper review-wrapper'>
      <div className='breadcrumbs'>
        <HomeLink isActive={false} />
        <span> \ </span>
        <Link className='page-link' to={`/software_details/${id}`}>
          {name}
        </Link>
        <span> \ </span>
        {noReviewsPage ? null : (
          <>
            <Link className='page-link' to={`/software_details/${id}/reviews`}>
              {' '}
              Reviews
            </Link>
            <span> \ </span>
          </>
        )}
        <Link
          className='page-link active-page-link'
          to={{
            pathname: `/software_details/${id}/reviews/${review.id}`,
            state: {
              fromSoftwareDetailsPage: fromSoftwareDetailsPage
                ? fromSoftwareDetailsPage
                : false,
              noReviewsPage: noReviewsPage ? noReviewsPage : false,
            },
          }}
        >
          {' '}
          Review
        </Link>
      </div>

      <section className='software'>
        <SoftwareBasicInfo name={name} developer={developer} />
      </section>

      <Link
        className='back-link'
        to={`${
          fromSoftwareDetailsPage
            ? `/software_details/${id}`
            : `/software_details/${id}/reviews`
        }`}
      >
        <img src='/images/back arrow.svg' alt='back arrow' /> <span>Back</span>
      </Link>
      <Review review={review} />
    </div>
  );
}

export default CompleteReview;
