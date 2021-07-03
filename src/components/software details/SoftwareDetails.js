import { Component } from 'react';
import Software from './page components/Software';
import SoftwareDescription from './page components/SoftwareDescription';
import SoftwareRating from './page components/SoftwareRating';
import ReviewsSection from './page components/ReviewsSection';
import { reviews } from '../../data/reviews';

class SoftwareDetails extends Component {
  render() {
    const { state } = this.props.location;

    return (
      <div className='wrapper software-details-wrapper'>
        <div className='breadcrumbs'>
          <a href='/' className='page-link'>
            Home
          </a>
          <span> \ </span>
          <a href='/software_details' className='page-link active-page-link'>
            {state.name}
          </a>
        </div>

        <Software software={state} />

        <section className='software-description-and-rating'>
          <SoftwareDescription />
          <SoftwareRating rating={state.rating} />
        </section>

        <ReviewsSection
          reviews={reviews}
          software={{ name: state.name, developer: state.developer }}
        />
      </div>
    );
  }
}

export default SoftwareDetails;
