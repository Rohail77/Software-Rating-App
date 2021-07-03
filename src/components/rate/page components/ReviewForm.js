import { Component } from 'react';
import FormError from './FormError';
import RatingSection from './RatingSection';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      review: '',
      rating: 0,
      isError: false,
      errorMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRating = this.setRating.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  setRating(rating) {
    this.setState({
      rating,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validate()
      ? this.setState(
          {
            username: '',
            review: '',
            isError: false,
            errorMsg: '',
            rating:0
          },
          this.props.showConfirmationModal
        )
      : this.showError();
  }

  showError() {
    this.setState(
      {
        isError: true,
        errorMsg: 'Please fill all the required fields *',
      },
      this.hideError
    );
  }

  hideError() {
    setTimeout(
      () =>
        this.setState({
          isError: false,
          errorMsg: '',
        }),
      3000
    );
  }

  validate() {
    if (this.state.rating === 0 || this.state.username === '') {
      return false;
    } return true
  }

  render() {
    const { rating, isError, errorMsg, username, review } = this.state;

    return (
      <form className='review-form' onSubmit={this.handleSubmit}>
        <RatingSection setRating={this.setRating} rating={rating} />
        <div>
          <label htmlFor='review'> Write a review (optional) </label>
          <textarea
            name='review'
            id='review'
            placeholder='Tell us your experience with the app'
            onChange={this.handleChange}
            value={review}
          ></textarea>
        </div>
        <div>
          <label htmlFor='username'>
            {' '}
            Your name <span className='required-arterisk'>*</span>{' '}
          </label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={this.handleChange}
            value={username}
          />
        </div>
        <button type='submit' className='submit-btn'>
          Submit
        </button>
        {isError ? <FormError errorMsg={errorMsg} /> : null}
      </form>
    );
  }
}

export default ReviewForm;
