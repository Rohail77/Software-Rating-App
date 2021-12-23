import { useEffect, useState } from 'react';
import SoftwareLogo from '../../../../../common/software basic info/software logo and details/SoftwareLogo';
import EditableFormButtons from './edit rating form/cta buttons/EditableFormButtons';
import NonEditableFormButtons from './edit rating form/cta buttons/NonEditableFormButtons';
import EditRatingForm from './edit rating form/EditRatingForm';
import { user } from '../../../../../../database/User';
import { softwares } from '../../../../../../database/Softwares';

function PastRating(props) {
  const [state, setState] = useState({
    rating: props.userReview.rating,
    review: props.userReview.review,
    editable: false,
    error: false,
    clickable: true,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      [name]: value,
    }));
  };

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

  const updateSoftware = () => {
    updateTotalReviews()
      .then(updateStarCount)
      .then(updateSoftwareLocal)
      .catch(error => console.log(error));
  };

  const updateTotalReviews = () => {
    const { softwareID } = props.userReview;

    if (shouldDecrementTotalReviews())
      return softwares.decrementTotalReviews(softwareID);
    if (shouldIncrementTotalReviews())
      return softwares.incrementTotalReviews(softwareID);
    return Promise.resolve();
  };

  const shouldDecrementTotalReviews = () => {
    const { review } = state;
    return review === '' && review !== props.userReview.review;
  };

  const shouldIncrementTotalReviews = () => {
    const { review } = state;
    return review !== '' && props.userReview.review === '';
  };

  const updateStarCount = () => {
    if (shouldChangeStarCount()) {
      const { softwareID } = props.userReview;
      const { rating } = state;
      return softwares
        .replaceStarCount(softwareID, rating, props.userReview.rating)
        .then(() => softwares.updateAverageRating(softwareID));
    }
    return Promise.resolve();
  };

  const shouldChangeStarCount = () => {
    const { rating } = state;
    return rating !== props.userReview.rating;
  };

  const updateSoftwareLocal = () => {
    const { softwareID } = props.userReview;
    props.updateSoftware(softwareID);
  };

  const handleDelete = () => {
    setState(state => ({ ...state, clickable: false }));
    deleteReview();
  };

  const deleteReview = () => {
    const { rating, review } = state;
    const { softwareID } = props.userReview;
    const { getUpdatedUserReviews } = props;
    user.deleteReview(softwareID).then(() => {
      getUpdatedUserReviews();
      if (review !== '') softwares.decrementTotalReviews(softwareID);
      softwares
        .updateStarCount(softwareID, rating, 'DEC')
        .then(() => softwares.updateAverageRating(softwareID))
        .then(updateSoftwareLocal);
    });
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
