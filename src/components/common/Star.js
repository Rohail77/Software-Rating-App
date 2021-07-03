import { Component } from 'react';

class Star extends Component {
  render() {
    const {starType} = this.props;
    return (
      <li className='star'>
        <img src={`images/${starType}.svg`} alt={starType} />
      </li>
    );
  }
}

export default Star;
