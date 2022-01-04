function Search({ setSoftwareSearchString, softwareSearchInput }) {
  const handleChange = event => {
    event.preventDefault();
    setSoftwareSearchString(softwareSearchInput.current.value);
  };

  return (
    <div className='search'>
      <span className='material-icons search__img'>search</span>
      <input
        type='text'
        name='name'
        placeholder='Search for a software...'
        ref={softwareSearchInput}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
