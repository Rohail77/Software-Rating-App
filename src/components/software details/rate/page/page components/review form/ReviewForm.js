import { useEffect, useState } from 'react';
import RatingInput from './rating input/RatingInput';
import {
  getSoftware,
  incrementTotalReviews,
  updateAverageRating,
  updateStarCount,
  writeRating,
} from '../../../../../../database/Softwares';
import WaitMessage from '../../../../../common/wait message/WaitMessage';
import ReviewLimitMessage from './limit message/ReviewLimitMessage';
import {
  addSoftwareToUserReviews,
  getUserReview,
  name,
} from '../../../../../../database/User';
import useUserReviews from '../../../../../../hooks/useUserReviews';
import { update } from '../../../../../../features/softwaresSlice';
import { useDispatch } from 'react-redux';
import { requestAddUserReview } from '../../../../../../features/softwareReviewsSlice';
import { alertError, isEmpty } from '../../../../../../utils/util-functions';
import { add } from '../../../../../../features/userReviewsSlice';
import useWaiter from '../../../../../../hooks/useWaiter';

const MAX_REVIEW_LENGTH = 3000;

const waitMessageStyles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function ReviewForm(props) {
  const initialState = {
    review: '',
    rating: 0,
  };

  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const [waiting, wait, stopWait] = useWaiter();

  useUserReviews(true);

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

  useEffect(() => {
    if (waiting) saveData();
  }, [waiting]);

  const saveData = async () => {
    try {
      const { rating, review } = state;
      const { softwareID } = props;
      await writeRating(softwareID, {
        username: name(),
        rating,
        review,
      });
      updateUserReviews();
      if (!isEmpty(review)) await incrementTotalReviews(softwareID);
      await updateStarCount(softwareID, rating, 'INC');
      await updateAverageRating(softwareID);
      await afterSave();
      stopWait();
    } catch (error) {
      alertError();
    }
  };

  const updateUserReviews = async () => {
    await addSoftwareToUserReviews(props.softwareID);
    const review = await getUserReview(props.softwareID);
    dispatch(add(review));
  };

  const afterSave = async () => {
    const { showConfirmationModal, softwareID } = props;
    const software = await getSoftware(softwareID);
    dispatch(update(software));
    dispatch(requestAddUserReview(softwareID));
    reset();
    showConfirmationModal();
  };

  const reset = () => setState(initialState);

  const isIncomplete = () => {
    const { rating, review } = state;
    return rating === 0 || review.length >= MAX_REVIEW_LENGTH;
  };

  const { rating, review } = state;

  return (
    <form className='review-form' onSubmit={handleSubmit}>
      <RatingInput setRating={setRating} rating={rating} />
      <div>
        <label htmlFor='review'>Review (optional) </label>
        {review.length >= MAX_REVIEW_LENGTH && (
          <ReviewLimitMessage maxReviewLength={MAX_REVIEW_LENGTH} />
        )}
        <textarea
          name='review'
          id='review'
          placeholder='Tell us your experience with the app'
          onChange={handleChange}
          value={review}
          maxLength={MAX_REVIEW_LENGTH}
        ></textarea>
      </div>

      <button
        type='submit'
        className={`submit-btn${isIncomplete() ? ' submit-btn--disabled' : ''}`}
      >
        Submit
      </button>
      {waiting && <WaitMessage styles={waitMessageStyles} />}
    </form>
  );
}

export default ReviewForm;
