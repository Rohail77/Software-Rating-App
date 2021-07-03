import { Component } from 'react';

class Rating extends Component {
  render() {
    const {ratingQty, ratingPercentage} = this.props;

    return (
      <div>
        <li className='rating'>
          <div className='rating__type'>
            <span className='rating-qty'>{ratingQty}</span>
            <img src='images/red star.svg' alt='red star' />
          </div>
          <div className='rating__growth'>
            <div
              className='rating__growth__line'
              style={{
                width: `${ratingPercentage}%`,
              }}
            ></div>
          </div>
        </li>
      </div>
    );
  }
}

export default Rating;
