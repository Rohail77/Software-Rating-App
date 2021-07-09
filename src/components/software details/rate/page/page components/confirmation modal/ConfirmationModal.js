import { Link } from 'react-router-dom';

function ConfirmationModal({softwareID}) {
    return (
      <div className='confirmation-modal-overlay'>
        <div className='confirmation-modal'>
          <p>Feedback submitted!</p>
          <div className='confirmation-modal__buttons'>
            <Link
              to={{
                pathname: '/',
              }}
            >
              Home
            </Link>
            <Link
              to={{
                pathname: `/software_details/${softwareID}`,
              }}
            >
              Exit
            </Link>
          </div>
        </div>
      </div>
    );
  
}

export default ConfirmationModal;
