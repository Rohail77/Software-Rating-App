import { Component } from 'react';
import RatingStarsList from '../../../../software details/rate/page/page components/review form/rating input/rating stars list/RatingStarsList';

class EditReviewForm extends Component {
  render() {
    const { review, rating, handleChange, editable, setRating } = this.props;

    return (
      <form className='past-review__form'>
        <div
          className='past-review__form__overlay'
          style={{ display: editable ? 'none' : 'block' }}
        >
          {' '}
        </div>
        <RatingStarsList rating={rating} setRating={setRating} />
        <textarea
          className='past-review__text'
          name='review'
          value={review}
          onChange={handleChange}
        ></textarea>
      </form>
    );
  }
}

export default EditReviewForm;
