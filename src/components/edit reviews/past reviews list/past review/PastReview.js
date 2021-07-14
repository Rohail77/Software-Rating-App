import { Component } from 'react';
import SoftwareLogo from '../../../common/software basic info/software logo and details/SoftwareLogo';
import EditableFormButtons from './edit review form/cta buttons/EditableFormButtons';
import NonEditableFormButtons from './edit review form/cta buttons/NonEditableFormButtons';
import EditReviewForm from './edit review form/EditReviewForm';
import { user } from '../../../../database/User';
import { db } from '../../../../database/Softwares';

class PastReview extends Component {
  constructor(props) {
    super(props);
    const { rating, review } = this.props.userReview;
    this.state = {
      rating,
      review,
      editable: false,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setEditable = this.setEditable.bind(this);
    this.reset = this.reset.bind(this);
    this.updateAverageRating = this.updateAverageRating.bind(this);
    this.hideNoChangeMessage = this.hideNoChangeMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSoftware = this.updateSoftware.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    if (this.reviewUpdated()) {
      const { softwareID } = this.props.userReview;
      const { rating, review } = this.state;
      user.updateReview(softwareID, { rating, review }, this.updateSoftware);
    } else {
      this.showNoChangeMessage();
    }
  }

  updateSoftware() {
    if (this.shouldDecrementTotalReviews()) this.decrementTotalReviews();
    else if (this.shouldIncrementTotalReviews()) this.incrementTotalReviews();
    if (this.shouldChangeStarCount()) this.updateStarCount();
    // const { softwareID } = this.props.userReview;
    // this.props.updateSoftware(softwareID);
  }

  reviewUpdated() {
    const { review, rating } = this.state;
    const { userReview } = this.props;
    return review !== userReview.review || rating !== userReview.rating;
  }

  shouldDecrementTotalReviews() {
    const { review } = this.state;
    return review === '' && review !== this.props.userReview.review;
  }

  shouldIncrementTotalReviews() {
    const { review } = this.state;
    return review !== '' && this.props.userReview.review === '';
  }

  decrementTotalReviews() {
    const { softwareID } = this.props.userReview;
    db.decrementTotalReviews(softwareID);
  }

  incrementTotalReviews() {
    const { softwareID } = this.props.userReview;
    db.incrementTotalReviews(softwareID);
  }

  shouldChangeStarCount() {
    const { rating } = this.state;
    return rating !== this.props.userReview.rating;
  }

  updateStarCount() {
    const { softwareID } = this.props.userReview;
    const { rating } = this.state;

    db.replaceStarCount(
      softwareID,
      rating,
      this.props.userReview.rating,
      this.updateAverageRating
    );
  }

  updateAverageRating() {
    const { softwareID } = this.props.userReview;
    db.updateAverageRating(softwareID);
  }

  handleDelete() {
    const { softwareID } = this.props.userReview;
    const { rating, review } = this.state;
    user.deleteReview(softwareID, () => {
      if (review !== '') db.decrementTotalReviews(softwareID);
      db.updateStarCount(softwareID, rating, 'DEC', () => {
        db.updateAverageRating(softwareID);
      });
    });
  }

  setRating(rating) {
    this.setState({
      rating,
    });
  }

  setEditable(value) {
    this.setState({
      editable: value,
    });
  }

  showNoChangeMessage() {
    this.setState(
      {
        error: true,
      },
      () => setTimeout(this.hideNoChangeMessage, 3000)
    );
  }

  hideNoChangeMessage() {
    this.setState({
      error: false,
    });
  }

  reset() {
    const { rating, review } = this.props.userReview;
    this.setState({
      rating,
      review,
      editable: false,
    });
  }

  render() {
    const { date, softwareName } = this.props.userReview;
    const { editable, rating, review, error } = this.state;

    return (
      <li className='past-review'>
        <div className='past-review__basic-info-and-ctas'>
          <div className='past-review__software'>
            <SoftwareLogo name={softwareName} />
            <div className='software__details'>
              <p className='software__name'>{softwareName}</p>
              <p className='software__review-date'>{date}</p>
            </div>
          </div>
          {editable ? (
            <EditableFormButtons
              reset={this.reset}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <NonEditableFormButtons
              setEditable={this.setEditable}
              handleDelete={this.handleDelete}
            />
          )}
        </div>
        {error ? <p className='no-change-msg'>* No change To update</p> : null}
        <EditReviewForm
          rating={rating}
          review={review}
          editable={editable}
          handleChange={this.handleChange}
          setRating={this.setRating}
        />
      </li>
    );
  }
}

export default PastReview;
