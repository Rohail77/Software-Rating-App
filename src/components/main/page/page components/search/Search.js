function Search({ setSoftwareSearchString, softwareSearchInput }) {
  const handleClick = event => {
    event.preventDefault();
    setSoftwareSearchString(softwareSearchInput.current.value);
  };

  return (
    <div className='search'>
      <a className='search__img' href='null' onClick={handleClick}>
        <img src='images/search.svg' alt='magnifying glass' />
      </a>
      <input
        type='text'
        name='name'
        placeholder='Search'
        ref={softwareSearchInput}
      />
    </div>
  );
}

export default Search;
