import { Component } from 'react';
import SoftwareInfo from '../common/SoftwareInfo';
import ConfirmationModal from './page components/ConfirmationModal';
import ReviewForm from './page components/ReviewForm';
import { Link } from 'react-router-dom';

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitted: false,
    };

    this.showConfirmationModal = this.showConfirmationModal.bind(this);
  }

  showConfirmationModal() {
    this.setState({
      formSubmitted: true,
    });
  }

  render() {
    const { name, developer, id } = this.props.location.state.software;

    return (
      <div className='wrapper rate-wrapper'>
        <div className='breadcrumbs'>
          <Link
            className='page-link'
            to={{
              pathname: '/',
            }}
          >
            Home
          </Link>
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: '/software_details',
            }}
          >
            {name}
          </Link>
          <span> \ </span>
          <a href='/rate' className='page-link active-page-link'>
            Rate
          </a>
        </div>

        <section className='software'>
          <SoftwareInfo name={name} developer={developer} />
        </section>

        <ReviewForm
          showConfirmationModal={this.showConfirmationModal}
          softwareID={id}
        />

        {this.state.formSubmitted ? <ConfirmationModal /> : null}
      </div>
    );
  }
}

export default Rate;
