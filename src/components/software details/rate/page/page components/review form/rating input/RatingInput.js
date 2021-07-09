import RatingStarsList from './rating stars list/RatingStarsList';

function RatingInput(props) {
  return (
    <div className='rate'>
      <h2>
        Rate <span className='required-arterisk'>*</span>
      </h2>
      <RatingStarsList {...props} />
    </div>
  );
}

export default RatingInput;
