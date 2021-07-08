import { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { setSoftwareSearchString, softwareSearchInput } = this.props;
    setSoftwareSearchString(softwareSearchInput.current.value);
  }

  render() {
    const { softwareSearchInput } = this.props;
    return (
      <div className='search'>
        <a className='search__img' href='null' onClick={this.handleClick}>
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
}

export default Search;
