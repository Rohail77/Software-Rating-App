import { Component } from 'react';

export class Software extends Component {
  render() {
    const { name, developer, rating, reviews } = this.props.software;

    return (
      <section className='software'>
        <img
          src={`images/software logos/${name.toLowerCase()}.svg`}
          alt={`${name.toLowerCase()} logo`}
          className='software__logo'
        />
        <div className='software__details'>
          <p className='software__name'>{name}</p>
          <p className='software__developer'>{developer}</p>
        </div>
        <div className='feedback-content'>
          <div className='feedback'>
            <div className='feedback__rating'>
              <span className='rating-qty'>{rating.average}</span>
              <img src='images/red star.svg' alt='red star' />
            </div>
            <span> | </span>
            <div className='feedback__reviews'>
              <span className='reviews-qty'>{reviews}</span> <span>Reviews</span>
            </div>
          </div>
          <a href='/rate' className='rate-link'>
            Rate this app
          </a>
        </div>
      </section>
    );
  }
}

export default Software;
