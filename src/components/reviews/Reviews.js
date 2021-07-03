import { Component } from 'react';
import Software from './page components/Software';
import ReviewsList from '../common/ReviewsList';
import FilterRatingForm from './page components/FilterRatingForm';
import ReviewPages from './page components/ReviewPages';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.location.state.reviews,
      currentPage: 1,
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
    const { reviews } = this.props.location.state;
    this.setState(state => {
      return {
        reviews:
          category === 'all'
            ? reviews
            : reviews.filter(review => review.star === category),
        currentPage: 1
      };
    });
  }

  getReviewsForCurrentPage() {
    return this.state.reviews.slice(
      this.getInitialReviewNumberForCurrentPage(),
      this.getInitialReviewNumberForCurrentPage() + 10
    );
  }
  getInitialReviewNumberForCurrentPage() {
    const { currentPage } = this.state;
    return (currentPage - 1) * 10;
  }

  getTotalPages() {
    return Math.ceil(this.state.reviews.length / 10);
  }

  render() {
    const { software } = this.props.location.state;

    return (
      <div className='wrapper reviews-wrapper'>
        <div className='breadcrumbs'>
          <a href='/' className='page-link'>
            Home
          </a>
          <span> \ </span>
          <a href='/software_details' className='page-link'>
            Visual Studio Code
          </a>
          <span> \ </span>
          <a href='/reviews' className='page-link active-page-link'>
            Reviews
          </a>
        </div>

        <Software software={software} />

        <section className='reviews'>
          <h2 className='reviews-heading'>Reviews</h2>
          <p className='ask-for-review-para'>
            Write a review by rating this app
          </p>
          <a href='rate.html' className='rate-link'>
            Rate this app
          </a>

          <FilterRatingForm filterReviews={this.filterReviews} />

          <ReviewsList reviews={this.getReviewsForCurrentPage()} />
          <ReviewPages
            totalPages={this.getTotalPages()}
            currentPage={this.state.currentPage}
            updateCurrentPage={this.updateCurrentPage}
          />
        </section>
      </div>
    );
  }
}

export default Reviews;
