import Star from './Star';
import { v4 as uuidv4 } from 'uuid';

function Stars({ averageRating }) {
  const getTotalRedStars = () => Math.floor(averageRating);

  const getTotalWhiteStars = () =>
    Number.isInteger(averageRating)
      ? 5 - averageRating
      : 5 - Math.ceil(averageRating);

  const getStarTypes = () => {
    const starTypes = [];

    for (let i = 1; i <= getTotalRedStars(); i++) {
      starTypes.push('red star');
    }

    if (getTotalRedStars() < 5 && !Number.isInteger(averageRating)) {
      starTypes.push('half filled red star');
    }

    for (let i = 1; i <= getTotalWhiteStars(); i++) {
      starTypes.push('white star');
    }
    return starTypes;
  };

  return (
    <ul className='stars-list'>
      {getStarTypes().map(starType => (
        <Star starType={starType} key={uuidv4()} />
      ))}
    </ul>
  );
}

export default Stars;
