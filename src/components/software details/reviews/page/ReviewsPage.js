import { Component } from 'react';
import SoftwareInfo from './page components/software info/SoftwareInfo';
import ReviewsList from '../../common components/reviews/review list/ReviewsList';
import ReviewPages from './page components/reviews section/review pages/ReviewPages';
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
    return reviews.slice(
      this.getInitialReviewNumberForCurrentPage(),
      this.getInitialReviewNumberForCurrentPage() + 10
    );
  }
  getInitialReviewNumberForCurrentPage() {
    const { currentPage } = this.state;
    return (currentPage - 1) * 10;
  }

  getTotalPages() {
    const { reviews } = this.state;
    return Math.ceil(reviews.length / 10);
  }

  render() {
    const { software } = this.props;
    const { reviews } = this.state;

    return (
      <div className='wrapper reviews-wrapper'>
        <div className='breadcrumbs'>
          <HomeLink isActive={false} />
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: `/software_details/${software.id}`,
            }}
          >
            {software.name}
          </Link>
          <span> \ </span>
          <Link
            className='page-link active-page-link'
            to={{
              pathname: `/software_details/${software.id}/reviews`,
            }}
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

          <RateLink softwareID={software.id} />

          <ReviewsInfo
            filterReviews={this.filterReviews}
            total_reviews={reviews.length}
          />

          <ReviewsList
            reviews={this.getReviewsForCurrentPage()}
            softwareID={software.id}
          />
          {this.getTotalPages() === 0 ? null : (
            <ReviewPages
              totalPages={this.getTotalPages()}
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
