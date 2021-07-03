import { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.setSoftwareSearchString(this.state.name);
    this.setState({
      name:''
    })
  }

  render() {
    return (
      <div className='search'>
        <a className='search__img' href='null' onClick={this.handleClick}>
          <img src='images/search.svg' alt='magnifying glass' />
        </a>
        <input
          type='text'
          name='name'
          placeholder='Search'
          value={this.state.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
