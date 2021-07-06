import { Component } from 'react';

class SoftwareDescription extends Component {
  render() {

    const {description} = this.props;

    return (
      <div className='software-description'>
        <h2>Description</h2>
        <p>{description}</p>
      </div>
    );
  }
}

export default SoftwareDescription;
