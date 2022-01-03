import { useEffect, useState } from 'react';
import SoftwareLogo from '../../../../../common/software basic info/software logo and details/SoftwareLogo';
import EditableFormButtons from './edit rating form/cta buttons/EditableFormButtons';
import NonEditableFormButtons from './edit rating form/cta buttons/NonEditableFormButtons';
import EditRatingForm from './edit rating form/EditRatingForm';
import { user } from '../../../../../../database/User';
import { softwares } from '../../../../../../database/Softwares';
import { update } from '../../../../../../features/softwaresSlice';
import { useDispatch } from 'react-redux';
import { isEmpty } from '../../../../../../utils/util-functions';

function PastRating(props) {
  const [state, setState] = useState({
    rating: props.userReview.rating,
    review: props.userReview.review,
    editable: false,
    error: false,
    clickable: true,
  });

  const dispatch = useDispatch();

  const handleChange = event =>
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = () => {
    if (reviewUpdated()) {
      const { softwareID } = props.userReview;
      const { rating, review } = state;
      user.updateReview(softwareID, { rating, review });
      updateSoftware();
    } else {
      showNoChangeMessage();
    }
  };

  const reviewUpdated = () => {
    const { review, rating } = state;
    const { userReview } = props;
    return review !== userReview.review || rating !== userReview.rating;
  };

  const updateSoftware = async () => {
    try {
      await updateTotalReviews();
      await updateStarCount();
      updateSoftwareLocal();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTotalReviews = () => {
    const { softwareID } = props.userReview;

    if (shouldDecrementTotalReviews())
      return softwares.decrementTotalReviews(softwareID);
    if (shouldIncrementTotalReviews())
      return softwares.incrementTotalReviews(softwareID);
    return Promise.resolve();
  };

  const shouldDecrementTotalReviews = () =>
    isEmpty(state.review) && !isEmpty(props.userReview.review);

  const shouldIncrementTotalReviews = () =>
    !isEmpty(state.review) && isEmpty(props.userReview.review);

  const updateStarCount = async () => {
    if (shouldChangeStarCount()) {
      const { softwareID } = props.userReview;
      const { rating } = state;
      await softwares.replaceStarCount(
        softwareID,
        rating,
        props.userReview.rating
      );
      return await softwares.updateAverageRating(softwareID);
    }
    return Promise.resolve();
  };

  const shouldChangeStarCount = () => state.rating !== props.userReview.rating;

  const updateSoftwareLocal = async () => {
    const { softwareID } = props.userReview;
    const software = await softwares.getSoftware(softwareID);
    dispatch(update(software));
  };

  const handleDelete = () => {
    setState(state => ({ ...state, clickable: false }));
    deleteReview();
  };

  const deleteReview = async () => {
    const { rating, review } = state;
    const { softwareID } = props.userReview;
    const { getUpdatedUserReviews } = props;
    await user.deleteReview(softwareID);
    getUpdatedUserReviews();
    if (!isEmpty(review)) softwares.decrementTotalReviews(softwareID);
    await softwares.updateStarCount(softwareID, rating, 'DEC');
    await softwares.updateAverageRating(softwareID);
    updateSoftwareLocal();
  };

  const setRating = rating => {
    setState(state => ({
      ...state,
      rating,
    }));
  };

  const setEditable = value => {
    setState(state => ({
      ...state,
      editable: value,
    }));
  };

  const showNoChangeMessage = () => {
    setState(state => ({
      ...state,
      error: true,
    }));
  };

  useEffect(() => {
    const hideNoChangeMessage = () =>
      setState(state => ({
        ...state,
        error: false,
      }));

    if (state.error) setTimeout(hideNoChangeMessage, 3000);
  }, [state.error]);

  const reset = () => {
    const { rating, review } = props.userReview;
    setState(state => ({
      ...state,
      rating,
      review,
      editable: false,
    }));
  };

  const { date, softwareName } = props.userReview;
  const { editable, rating, review, error, clickable } = state;

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
          <EditableFormButtons reset={reset} handleSubmit={handleSubmit} />
        ) : (
          <NonEditableFormButtons
            setEditable={setEditable}
            handleDelete={handleDelete}
            clickable={clickable}
          />
        )}
      </div>
      {error && <p className='no-change-msg'>* No change To update</p>}
      <EditRatingForm
        rating={rating}
        review={review}
        editable={editable}
        handleChange={handleChange}
        setRating={setRating}
      />
    </li>
  );
}

export default PastRating;
