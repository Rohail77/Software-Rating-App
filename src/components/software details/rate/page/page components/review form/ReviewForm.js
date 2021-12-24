import { useEffect, useState } from 'react';
import RatingInput from './rating input/RatingInput';
import { softwares } from '../../../../../../database/Softwares';
import WaitMessage from '../../../../../common/wait message/WaitMessage';
import ReviewLimitMessage from './limit message/ReviewLimitMessage';
import { user } from '../../../../../../database/User';

function ReviewForm(props) {
  const [state, setState] = useState({
    review: '',
    rating: 0,
    onWait: false,
  });

  const data = {
    maxReviewLength: 3000,
  };

  const handleChange = event => {
    event.preventDefault();
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const setRating = rating =>
    setState(state => ({
      ...state,
      rating,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    wait();
  };

  const wait = () => {
    setState(state => ({
      ...state,
      onWait: true,
    }));
  };

  useEffect(() => {
    if (state.onWait) saveData();
  }, [state.onWait]);

  const saveData = () => {
    const { rating, review } = state;
    const { softwareID } = props;
    softwares
      .writeRating(softwareID, {
        username: user.name,
        rating,
        review,
      })
      .then(addSoftwareToUserReviews);
    review === '' ? incrementStarCount() : incrementTotalReviews();
  };

  const addSoftwareToUserReviews = () => {
    const { softwareID, getUpdatedUserReviews } = props;
    user.addSoftwareToReviews(softwareID).then(() => {
      getUpdatedUserReviews();
      user.bindUpdaterToReviews(getUpdatedUserReviews);
    });
  };

  const incrementTotalReviews = () => {
    const { softwareID } = props;
    softwares.incrementTotalReviews(softwareID).then(incrementStarCount);
  };

  const incrementStarCount = () => {
    const { softwareID } = props;
    const { rating } = state;
    softwares
      .updateStarCount(softwareID, rating, 'INC')
      .then(updateAverageRating);
  };

  const updateAverageRating = () => {
    const { softwareID } = props;
    softwares.updateAverageRating(softwareID).then(afterSave);
  };

  const afterSave = () => {
    const { showConfirmationModal, updateSoftware, softwareID } = props;
    updateSoftware(softwareID);

    setState({
      review: '',
      rating: 0,
      onWait: false,
    });
    showConfirmationModal();
  };

  const isIncomplete = () => {
    const { rating, review } = state;
    const { maxReviewLength } = data;
    return rating === 0 || review.length >= maxReviewLength;
  };

  const { rating, review, onWait } = state;
  const { maxReviewLength } = data;

  return (
    <form className='review-form' onSubmit={handleSubmit}>
      <RatingInput setRating={setRating} rating={rating} />
      <div>
        <label htmlFor='review'>Review (optional) </label>
        {review.length >= maxReviewLength && (
          <ReviewLimitMessage maxReviewLength={maxReviewLength} />
        )}
        <textarea
          name='review'
          id='review'
          placeholder='Tell us your experience with the app'
          onChange={handleChange}
          value={review}
          maxLength={maxReviewLength}
        ></textarea>
      </div>

      <button
        type='submit'
        className={`submit-btn${isIncomplete() ? ' submit-btn--disabled' : ''}`}
      >
        Submit
      </button>
      {onWait && <WaitMessage />}
    </form>
  );
}

export default ReviewForm;
