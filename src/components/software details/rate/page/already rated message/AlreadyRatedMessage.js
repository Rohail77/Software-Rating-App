import { Link } from 'react-router-dom';

function AlreadyRatedMessage({ softwareID }) {
  return (
    <div className='already-rated-modal-wrapper'>
      <section className='already-rated-modal'>
        <p>
          You have already rated this software. Go to ratings page to edit your
          rating.
        </p>
        <div className='cta-btns'>
          <Link className='exit-btn' to={`/software_details/${softwareID}`}>
            Exit
          </Link>
          <Link className='edit-btn' to='/rated_apps'>
            Edit ratings
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AlreadyRatedMessage;
