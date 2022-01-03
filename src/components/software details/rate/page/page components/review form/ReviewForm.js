import { useEffect, useState } from 'react';
import RatingInput from './rating input/RatingInput';
import { softwares } from '../../../../../../database/Softwares';
import WaitMessage from '../../../../../common/wait message/WaitMessage';
import ReviewLimitMessage from './limit message/ReviewLimitMessage';
import { user } from '../../../../../../database/User';
import useUserReviews from '../../../../../../hooks/useUserReviews';
import { update } from '../../../../../../features/softwaresSlice';
import { useDispatch } from 'react-redux';
import useSoftwareReviews from '../../../../../../hooks/useSoftwareReviews';
import { requestAddUserReview } from '../../../../../../features/softwareReviewsSlice';

function ReviewForm(props) {
  const [state, setState] = useState({
    review: '',
    rating: 0,
    onWait: false,
  });

  const data = {
    maxReviewLength: 3000,
  };

  const dispatch = useDispatch();

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

  const [, , getUpdatedUserReviews] = useUserReviews(true);

  const addSoftwareToUserReviews = () => {
    const { softwareID } = props;
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

  const afterSave = async () => {
    const { showConfirmationModal, softwareID } = props;
    const software = await softwares.getSoftware(softwareID);
    dispatch(update(software));
    dispatch(requestAddUserReview(softwareID));

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
