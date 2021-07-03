import { Component } from 'react';

class ConfirmationModal extends Component {
  render() {
    return (
      <div className='confirmation-modal'>
        <p>Thanks for your feedback! Your feedback is very helpful.</p>
        <a href='/'>Exit</a>
      </div>
    );
  }
}

export default ConfirmationModal;
