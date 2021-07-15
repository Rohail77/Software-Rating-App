import { Component } from 'react';
import RatingInput from './rating input/RatingInput';
import { db } from '../../../../../../database/Softwares';
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
    this.saveData = this.saveData.bind(this);
    this.addSoftwareToUserReviews = this.addSoftwareToUserReviews.bind(this);
    this.incrementTotalReviews = this.incrementTotalReviews.bind(this);
    this.incrementStarCount = this.incrementStarCount.bind(this);
    this.updateAverageRating = this.updateAverageRating.bind(this);
    this.afterSave = this.afterSave.bind(this);
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
    const { softwareID } = this.props;
    db.writeRating(softwareID, {
      username: user.name,
      rating,
      review,
    }).then(this.addSoftwareToUserReviews);
    review === '' ? this.incrementStarCount() : this.incrementTotalReviews();
  }

  addSoftwareToUserReviews() {
    const { softwareID } = this.props;
    user.addSoftwareToReview(softwareID).then(() => {
      this.props.getUpdatedUserReviews();
    });
  }

  incrementTotalReviews() {
    const { softwareID } = this.props;
    db.incrementTotalReviews(softwareID).then(this.incrementStarCount);
  }

  incrementStarCount() {
    const { softwareID } = this.props;
    const { rating } = this.state;
    db.updateStarCount(softwareID, rating, 'INC').then(
      this.updateAverageRating
    );
  }

  updateAverageRating() {
    const { softwareID } = this.props;
    db.updateAverageRating(softwareID).then(this.afterSave);
  }

  afterSave() {
    const { showConfirmationModal, updateSoftware, softwareID } = this.props;
    updateSoftware(softwareID);

    this.setState(
      {
        review: '',
        rating: 0,
        onWait: false,
      },
      showConfirmationModal
    );
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
