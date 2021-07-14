import { Link } from 'react-router-dom';

function ConfirmationModal({ softwareID, setCanUserReview }) {
  function handleClick() {
    setCanUserReview(false);
  }

  return (
    <div className='confirmation-modal-overlay'>
      <div className='confirmation-modal'>
        <p>Feedback submitted!</p>
        <div className='confirmation-modal__buttons'>
          <Link
            to={{
              pathname: '/',
            }}
            onClick={handleClick}
          >
            Home
          </Link>
          <Link
            to={{
              pathname: `/software_details/${softwareID}`,
            }}
            onClick={handleClick}
          >
            Exit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
