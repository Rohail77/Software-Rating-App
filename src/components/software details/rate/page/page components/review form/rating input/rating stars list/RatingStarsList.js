import RatingStar from './RatingStar';
import { v4 as uuidv4 } from 'uuid';

function RatingStarsList(props) {
  function getStarTypes() {
    const { rating } = props;
    const starTypes = [];
    for (let starNumber = 0; starNumber < rating; starNumber++) {
      starTypes.push('red');
    }
    for (let starNumber = rating; starNumber < 5; starNumber++) {
      starTypes.push('white');
    }
    return starTypes;
  }

  return (
    <ul className='stars-list'>
      {getStarTypes().map((starType, index) => (
        <RatingStar
          {...props}
          starType={starType}
          starNumber={index + 1}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
}

export default RatingStarsList;
