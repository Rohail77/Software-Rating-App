import { Component } from 'react';
import SoftwareLogo from '../../../../../common/software basic info/software logo and details/SoftwareLogo';
import EditableFormButtons from './edit rating form/cta buttons/EditableFormButtons';
import NonEditableFormButtons from './edit rating form/cta buttons/NonEditableFormButtons';
import EditRatingForm from './edit rating form/EditRatingForm';
import { user } from '../../../../../../database/User';
import { softwares } from '../../../../../../database/Softwares';

class PastRating extends Component {
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
      return softwares.decrementTotalReviews(softwareID);
    if (this.shouldIncrementTotalReviews())
      return softwares.incrementTotalReviews(softwareID);
    return Promise.resolve();
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
      return softwares
        .replaceStarCount(softwareID, rating, this.props.userReview.rating)
        .then(() => softwares.updateAverageRating(softwareID));
    }
    return Promise.resolve();
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
    this.setState(
      {
        clickable: false,
      },
      this.deleteReview
    );
  }

  deleteReview() {
    const { rating, review } = this.state;
    const { softwareID } = this.props.userReview;
    const { getUpdatedUserReviews } = this.props;
    user.deleteReview(softwareID).then(() => {
      getUpdatedUserReviews();
      if (review !== '') softwares.decrementTotalReviews(softwareID);
      softwares
        .updateStarCount(softwareID, rating, 'DEC')
        .then(() => softwares.updateAverageRating(softwareID))
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
              clickable={clickable}
            />
          )}
        </div>
        {error ? <p className='no-change-msg'>* No change To update</p> : null}
        <EditRatingForm
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

export default PastRating;
