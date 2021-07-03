import React, { Component } from 'react';
import Stars from '../../common/Stars';
import { Link } from 'react-router-dom';

class software extends Component {
  render() {
    const { name, developer, rating, reviews } = this.props.software;
    return (
      <li className='software'>
        <Link
          to={{
            pathname: '/software_details',
            state: { name, developer, rating, reviews },
          }}
        >
          <img
            src={`images/software logos/${name.toLowerCase()}.svg`}
            alt={`${name.toLowerCase()} logo`}
            className='software__logo'
          />
          <div className='software__details'>
            <p className='software__name'>{name}</p>
            <p className='software__developer'>{developer}</p>
          </div>
          <Stars averageRating={rating.average} />
        </Link>
      </li>
    );
  }
}

export default software;
