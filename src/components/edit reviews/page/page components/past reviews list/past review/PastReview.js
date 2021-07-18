import { Component } from 'react';
import SoftwareLogo from '../../../../../common/software basic info/software logo and details/SoftwareLogo';
import EditableFormButtons from './edit review form/cta buttons/EditableFormButtons';
import NonEditableFormButtons from './edit review form/cta buttons/NonEditableFormButtons';
import EditReviewForm from './edit review form/EditReviewForm';
import { user } from '../../../../../../database/User';
import { db } from '../../../../../../database/Softwares';

class PastReview extends Component {
  constructor(props) {
    super(props);
    const { rating, review } = this.props.userReview;
    this.state = {
      rating,
      review,
      editable: false,
      error: false,
      clickable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setEditable = this.setEditable.bind(this);
    this.reset = this.reset.bind(this);
    this.hideNoChangeMessage = this.hideNoChangeMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSoftware = this.updateSoftware.bind(this);
    this.updateStarCount = this.updateStarCount.bind(this);
    this.updateSoftwareLocal = this.updateSoftwareLocal.bind(this);
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
      user.updateReview(softwareID, { rating, review });
      this.updateSoftware();
    } else {
      this.showNoChangeMessage();
    }
  }

  reviewUpdated() {
    const { review, rating } = this.state;
    const { userReview } = this.props;
    return review !== userReview.review || rating !== userReview.rating;
  }

  updateSoftware() {
    this.updateTotalReviews()
      .then(this.updateStarCount)
      .then(this.updateSoftwareLocal)
      .catch(error => console.log(error));
  }

  updateTotalReviews() {
    const { softwareID } = this.props.userReview;

    if (this.shouldDecrementTotalReviews())
      return db.decrementTotalReviews(softwareID);
    else if (this.shouldIncrementTotalReviews())
      return db.incrementTotalReviews(softwareID);
    else return Promise.resolve();
  }

  shouldDecrementTotalReviews() {
    const { review } = this.state;
    return review === '' && review !== this.props.userReview.review;
  }

  shouldIncrementTotalReviews() {
    const { review } = this.state;
    return review !== '' && this.props.userReview.review === '';
  }

  updateStarCount() {
    if (this.shouldChangeStarCount()) {
      const { softwareID } = this.props.userReview;
      const { rating } = this.state;
      return db
        .replaceStarCount(softwareID, rating, this.props.userReview.rating)
        .then(() => db.updateAverageRating(softwareID));
    } else {
      return new Promise.resolve();
    }
  }

  shouldChangeStarCount() {
    const { rating } = this.state;
    return rating !== this.props.userReview.rating;
  }

  updateSoftwareLocal() {
    const { softwareID } = this.props.userReview;
    this.props.updateSoftware(softwareID);
  }

  handleDelete() {
    const { softwareID } = this.props.userReview;
    const { getUpdatedUserReviews } = this.props;
    const { rating, review } = this.state;
    this.setState({
      clickable: false,
    });
    user.deleteReview(softwareID).then(() => {
      getUpdatedUserReviews();
      if (review !== '') db.decrementTotalReviews(softwareID);
      db.updateStarCount(softwareID, rating, 'DEC')
        .then(() => db.updateAverageRating(softwareID))
        .then(this.updateSoftwareLocal);
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
    const { editable, rating, review, error, clickable } = this.state;

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
              focusTextField={this.focusTextField}
              clickable={clickable}
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
          textInputRef={this.textInputRef}
        />
      </li>
    );
  }
}

export default PastReview;
