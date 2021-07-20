import { Component } from 'react';
import SoftwareInfo from './page components/software info/SoftwareInfo';
import ReviewsList from '../../common components/reviews/review list/ReviewsList';
import Pages from '../../../common/pages/Pages';
import RateLink from '../../common components/common links/RateLink';
import ReviewsInfo from './page components/reviews section/reviews info/ReviewsInfo';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';

class ReviewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      star: 'all',
      reviews: this.props.reviews,
    };
    this.data = {
      reviewsPerPage: 12,
    };
    this.filterReviews = this.filterReviews.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  updateCurrentPage(newPageNumber) {
    this.setState({
      currentPage: newPageNumber,
    });
  }

  filterReviews(category) {
    const { reviews } = this.props;
    this.setState(state => {
      return {
        reviews:
          category === 'all'
            ? reviews
            : reviews.filter(
                review => review.rating === Number.parseInt(category)
              ),
        currentPage: 1,
      };
    });
  }

  getReviewsForCurrentPage() {
    const { reviews } = this.state;
    const { reviewsPerPage } = this.data;
    return reviews.slice(
      this.getInitialReviewIndexForCurrentPage(),
      this.getInitialReviewIndexForCurrentPage() + reviewsPerPage
    );
  }
  getInitialReviewIndexForCurrentPage() {
    const { reviewsPerPage } = this.data;
    const { currentPage } = this.state;
    return (currentPage - 1) * reviewsPerPage;
  }

  render() {
    const { software } = this.props;
    const { reviews } = this.state;
    const { reviewsPerPage } = this.data;

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
          <p className='ask-for-review-para'>
            Write a review by rating this app
          </p>

          <RateLink
            softwareID={software.id}
          />

          <ReviewsInfo
            filterReviews={this.filterReviews}
            total_reviews={reviews.length}
          />

          <ReviewsList
            reviews={this.getReviewsForCurrentPage()}
            softwareID={software.id}
          />
          {reviews.length === 0 ? null : (
            <Pages
              totalItems={reviews.length}
              itemsPerPage={reviewsPerPage}
              currentPage={this.state.currentPage}
              updateCurrentPage={this.updateCurrentPage}
            />
          )}
        </section>
      </div>
    );
  }
}

export default ReviewsPage;
