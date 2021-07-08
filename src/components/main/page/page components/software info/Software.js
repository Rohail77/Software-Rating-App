import React, { Component } from 'react';
import Stars from '../../../../common/stars list/Stars';
import { Link } from 'react-router-dom';
import SoftwareBasicInfo from '../../../../common/software basic info/SoftwareBasicInfo';

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
          <SoftwareBasicInfo name={name} developer={developer} />
          <Stars averageRating={average_rating} />
        </Link>
      </li>
    );
  }
}

export default software;
