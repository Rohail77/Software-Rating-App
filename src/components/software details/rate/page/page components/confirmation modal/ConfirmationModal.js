import { Link } from 'react-router-dom';

function ConfirmationModal({ softwareID, setCanUserReview }) {
  const handleClick = () => setCanUserReview(false);

  return (
    <div className='confirmation-modal-overlay'>
      <div className='confirmation-modal'>
        <p>Feedback submitted!</p>
        <div className='confirmation-modal__buttons'>
          <Link to='/' onClick={handleClick}>
            Home
          </Link>
          <Link to={`/software_details/${softwareID}`} onClick={handleClick}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
