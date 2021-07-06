import { Component, Fragment } from 'react';
import Software from './page components/Software';
import SoftwareDescription from './page components/SoftwareDescription';
import SoftwareRating from './page components/SoftwareRating';
import ReviewsSection from './page components/ReviewsSection';

class SoftwareDetailsContent extends Component {
  render() {
    const {
      name,
      developer,
      average_rating,
      total_reviews,
      stars_count,
      description,
      id,
    } = this.props.software;
    const { reviews } = this.props;

    return (
      <Fragment>
        <Software
          name={name}
          developer={developer}
          average_rating={average_rating}
          total_reviews={total_reviews}
          id={id}
        />

        <section className='software-description-and-rating'>
          <SoftwareDescription description={description} />
          <SoftwareRating
            average_rating={average_rating}
            stars_count={stars_count}
          />
        </section>

        <ReviewsSection
          software={{
            name,
            developer,
            total_reviews,
            id,
          }}

          reviews={reviews}
        />
      </Fragment>
    );
  }
}

export default SoftwareDetailsContent;
