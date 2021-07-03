import { Component } from 'react';
import SoftwareInfo from '../../common/SoftwareInfo';
import RateLink from './RateLink';

export class Software extends Component {
  render() {
    const { name, developer, rating, reviews } = this.props.software;

    return (
      <section className='software'>
        <SoftwareInfo name={name} developer={developer} />

        <div className='feedback-content'>
          <div className='feedback'>
            <div className='feedback__rating'>
              <span className='rating-qty'>{rating.average}</span>
              <img src='images/red star.svg' alt='red star' />
            </div>
            <span> | </span>
            <div className='feedback__reviews'>
              <span className='reviews-qty'>{reviews}</span>{' '}
              <span>Reviews</span>
            </div>
          </div>
          <RateLink software={{ name, developer }} />
        </div>
      </section>
    );
  }
}

export default Software;
