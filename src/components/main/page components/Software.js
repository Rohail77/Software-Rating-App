import React, { Component } from 'react';
import Stars from '../../common/Stars';
import { Link } from 'react-router-dom';
import SoftwareInfo from '../../common/SoftwareInfo';

class software extends Component {

  render() {
    const { name, developer, average_rating, id } = this.props.software;
    return (
      <li className='software'>
        <Link
          to={{
            pathname: `/software_details/${id}`,
          }}
        >
          <SoftwareInfo name={name} developer={developer} />
          <Stars averageRating={average_rating} />
        </Link>
      </li>
    );
  }
}

export default software;
