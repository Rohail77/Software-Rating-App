import { Component } from 'react';
import SoftwareInfo from '../common/SoftwareInfo';
import ConfirmationModal from './page components/ConfirmationModal';
import ReviewForm from './page components/ReviewForm';
import { Link } from 'react-router-dom';
import HomeLink from '../common/HomeLink';

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
    const { name, developer, id } = this.props.software;

    return (
      <div className='wrapper rate-wrapper'>
        <div className='breadcrumbs'>
          <HomeLink isActive={false} />
          <span> \ </span>
          <Link
            className='page-link'
            to={{
              pathname: `/software_details/${id}`,
            }}
          >
            {name}
          </Link>
          <span> \ </span>
          <Link
            className='page-link active-page-link'
            to={{
              pathname: `/software_details/rate/${id}`,
            }}
          >
            Rate
          </Link>
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
