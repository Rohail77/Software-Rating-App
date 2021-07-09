import { Link } from 'react-router-dom';

function ReviewsLink({ softwareID }) {
  return (
    <Link
      className='reviews-link'
      to={{
        pathname: `/software_details/${softwareID}/reviews`,
      }}
    >
      {' '}
      See all reviews
    </Link>
  );
}

export default ReviewsLink;
