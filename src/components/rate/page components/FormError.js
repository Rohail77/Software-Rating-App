import { Component } from 'react';

class FormError extends Component {

  
  render() {
    const {errorMsg} = this.props;
    return <p className='error'>{errorMsg}</p>;
  }
}

export default FormError;
