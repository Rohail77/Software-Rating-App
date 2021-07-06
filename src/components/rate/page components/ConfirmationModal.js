import { Component } from 'react';
import HomeLink from '../../common/HomeLink';

class ConfirmationModal extends Component {
  render() {
    return (
      <div className='confirmation-modal-overlay'>
        <div className='confirmation-modal'>
          <p>Thanks for your feedback! Your feedback is very helpful.</p>
          <HomeLink isActive={false} />
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
