function Star({ starType }) {
  return (
    <li className='star'>
      <img src={`/images/${starType}.svg`} alt={starType} />
    </li>
  );
}

export default Star;
