import { Component } from 'react';
import { Link } from 'react-router-dom';

class AlreadyRatedMessage extends Component {
  render() {
    const { softwareID } = this.props;

    return (
      <div className='already-rated-modal-wrapper'>
        <section className='already-rated-modal'>
          <p>
            You have already rated this software. Go to edit page to edit your
            reviews.
          </p>
          <div className='cta-btns'>
            <Link className='exit-btn' to={`/software_details/${softwareID}`}>
              Exit
            </Link>
            <a href='a' className='edit-btn'>
              Edit reviews
            </a>
          </div>
        </section>
      </div>
    );
  }
}

export default AlreadyRatedMessage;
