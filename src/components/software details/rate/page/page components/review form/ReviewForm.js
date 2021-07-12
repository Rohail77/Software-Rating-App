import { Component } from 'react';
import RatingInput from './rating input/RatingInput';
import { db } from '../../../../../../database/Database';
import WaitMessage from '../../../../../common/wait message/WaitMessage';
import ReviewLimitMessage from './limit message/ReviewLimitMessage';
import { user } from '../../../../../../database/User';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      rating: 0,
      onWait: false,
    };
    this.data = {
      maxReviewLength: 3000,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRating = this.setRating.bind(this);
    this.afterSave = this.afterSave.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  setRating(rating) {
    this.setState({
      rating,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.wait();
  }

  wait() {
    this.setState(
      {
        onWait: true,
      },
      this.saveData
    );
  }

  saveData() {
    const { rating, review } = this.state;
    db.writeRating(this.props.softwareID, {
      username: user.name,
      rating,
      review,
    });
    db.onRatingWrite(this.afterSave);
  }

  afterSave() {
    const { showConfirmationModal, getUpdatedReviews } = this.props;
    this.setState(
      {
        review: '',
        rating: 0,
        onWait: false,
      },
      showConfirmationModal
    );
    getUpdatedReviews();
  }

  isIncomplete() {
    const { rating, review } = this.state;
    const { maxReviewLength } = this.data;
    return rating === 0 || review.length >= maxReviewLength;
  }

  render() {
    const { rating, review, onWait } = this.state;
    const { maxReviewLength } = this.data;

    return (
      <form className='review-form' onSubmit={this.handleSubmit}>
        <RatingInput setRating={this.setRating} rating={rating} />
        <div>
          <label htmlFor='review'>Review (optional) </label>
          {review.length >= maxReviewLength ? (
            <ReviewLimitMessage maxReviewLength={maxReviewLength} />
          ) : null}
          <textarea
            name='review'
            id='review'
            placeholder='Tell us your experience with the app'
            onChange={this.handleChange}
            value={review}
            maxLength={maxReviewLength}
          ></textarea>
        </div>

        <button
          type='submit'
          className={`submit-btn${
            this.isIncomplete() ? ' submit-btn--disabled' : ''
          }`}
        >
          Submit
        </button>
        {onWait ? <WaitMessage /> : null}
      </form>
    );
  }
}

export default ReviewForm;
