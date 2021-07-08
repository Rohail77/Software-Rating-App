import React, { Component } from 'react';
import Review from './Review';
import { v4 as uuidv4 } from 'uuid';

class ReviewsList extends Component {
  constructor(props) {
    super(props);
    this.data = {
      maxLength: 300,
      maxLengthDifference: 100,
    };
  }

  render() {
    const { reviews, softwareID, fromSoftwareDetailsPage } = this.props;

    return (
      <ul className='reviews__list'>
        {reviews.map(review => (
          <Review
            review={review}
            key={uuidv4()}
            {...this.data}
            softwareID={softwareID}
            fromSoftwareDetailsPage={
              fromSoftwareDetailsPage ? fromSoftwareDetailsPage : false
            }
          />
        ))}
      </ul>
    );
  }
}

export default ReviewsList;
