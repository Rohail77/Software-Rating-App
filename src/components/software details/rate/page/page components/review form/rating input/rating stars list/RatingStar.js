function RatingStar({ setRating, starNumber, starType }) {
  function handleClick(event) {
    event.preventDefault();
    setRating(starNumber);
  }

  return (
    <li>
      <a href='a'>
        <img
          className='star'
          src={`/images/${starType} star.svg`}
          alt={`${starType} star`}
          onClick={handleClick}
        />
      </a>
    </li>
  );
}

export default RatingStar;
