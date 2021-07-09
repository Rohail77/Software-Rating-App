function Rating({ ratingQty, ratingPercentage }) {
  return (
    <div>
      <li className='rating'>
        <div className='rating__type'>
          <span className='rating-qty'>{ratingQty}</span>
          <img src='/images/red star.svg' alt='red star' />
        </div>
        <div className='rating__growth'>
          <div
            className='rating__growth__line'
            style={{
              width: `${ratingPercentage}%`,
            }}
          ></div>
        </div>
      </li>
    </div>
  );
}

export default Rating;
