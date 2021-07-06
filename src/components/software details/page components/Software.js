import { Component } from 'react';
import ReviewsCount from '../../common/ReviewsCount';
import SoftwareInfo from '../../common/SoftwareInfo';
import RateLink from './RateLink';

export class Software extends Component {
  render() {
    const { name, developer, average_rating, total_reviews, id } = this.props;

    return (
      <section className='software'>
        <SoftwareInfo name={name} developer={developer} />

        <div className='feedback-content'>
          <div className='feedback'>
            <div className='feedback__rating'>
              <span className='rating-qty'>{average_rating}</span>
              <img src='/images/red star.svg' alt='red star' />
            </div>
            <span> | </span>
            <div className='feedback__reviews'>
              <ReviewsCount total_reviews={total_reviews} />
            </div>
          </div>
          <RateLink softwareID={id} />
        </div>
      </section>
    );
  }
}

export default Software;
