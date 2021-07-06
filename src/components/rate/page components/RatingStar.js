import { Component } from 'react';

class RatingStar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { setRating, starNumber } = this.props;
    setRating(starNumber);
  }

  render() {
    const { starType } = this.props;

    return (
      <li>
        <a href='a'>
          <img
            className='star'
            src={`/images/${starType} star.svg`}
            alt={`${starType} star`}
            onClick={this.handleClick}
          />
        </a>
      </li>
    );
  }
}

export default RatingStar;
