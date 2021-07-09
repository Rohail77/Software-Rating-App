import ReviewsCount from '../../../common components/reviews/reviews count/ReviewsCount';
import SoftwareBasicInfo from '../../../../common/software basic info/SoftwareBasicInfo';
import RateLink from '../../../common components/common links/RateLink';

function SoftwareInfo(props) {
  const { name, developer, average_rating, total_reviews, id } = props;

  return (
    <section className='software'>
      <SoftwareBasicInfo name={name} developer={developer} />

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

export default SoftwareInfo;
