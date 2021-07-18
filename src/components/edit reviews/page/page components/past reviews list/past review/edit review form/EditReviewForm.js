import RatingStarsList from '../../../../../../software details/rate/page/page components/review form/rating input/rating stars list/RatingStarsList';

function EditReviewForm(props) {
  const { review, rating, handleChange, editable, setRating } = props;

  return (
    <form className='past-review__form'>
      <div className='stars-list-parent'>
        <RatingStarsList rating={rating} setRating={setRating} />
        <div className={editable ? '' : `stars-list-cover`}></div>
      </div>
      <textarea
        className='past-review__text'
        name='review'
        value={review}
        onChange={handleChange}
        disabled={editable ? false : true}
      ></textarea>
    </form>
  );
}

export default EditReviewForm;
