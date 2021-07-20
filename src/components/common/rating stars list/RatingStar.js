function RatingStar({ setRating, starNumber, starType }) {
  const handleClick = event => {
    event.preventDefault();
    setRating(starNumber);
  };

  return (
    <li>
      <a href='a' onClick={handleClick}>
        <img
          className='star'
          src={`/images/${starType} star.svg`}
          alt={`${starType} star`}
        />
      </a>
    </li>
  );
}

export default RatingStar;
