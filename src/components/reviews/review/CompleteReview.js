import { Component } from 'react';
import Review from '../../common/Review';
import SoftwareInfo from '../../common/SoftwareInfo';
import { Link } from 'react-router-dom';
import HomeLink from '../../common/HomeLink';

class CompleteReview extends Component {
  render() {
    const { name, developer, id } = this.props.software;
    const { review } = this.props;

    return (
      <div class='wrapper review-wrapper'>
        <div class='breadcrumbs'>
          <HomeLink isActive={false} />
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: `/software_details/${id}`,
            }}
          >
            {name}
          </Link>
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: `/software_details/reviews/${id}`,
            }}
          >
            {' '}
            Reviews
          </Link>
          <span> \ </span>
          <Link
            className='page-link active-page-link'
            to={{
              pathname: `/software_details/reviews/review/${review.username}`,
            }}
          >
            {' '}
            Review
          </Link>
        </div>

        <section class='software'>
          <SoftwareInfo name={name} developer={developer} />
        </section>

        <Link
          className='back-link'
          to={{
            pathname: `/software_details/reviews/${id}`,
          }}
        >
          <img src='/images/back arrow.svg' alt='back arrow' />{' '}
          <span>Back</span>
        </Link>
        <Review review={review} />
      </div>
    );
  }
}

export default CompleteReview;
