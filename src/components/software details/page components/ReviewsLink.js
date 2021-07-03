import { Component } from 'react'
import { Link } from 'react-router-dom';

class ReviewsLink extends Component {

  
  render() {
    const {data} = this.props;

    return (
      <Link
        className='reviews-link'
        to={{
          pathname: '/reviews',
          state: data
        }}
      >
        {' '}
        See all reviews
      </Link>
    );
  }
}

export default ReviewsLink
