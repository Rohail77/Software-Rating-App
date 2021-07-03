import { Component } from 'react';
import SoftwareInfo from '../common/SoftwareInfo';
import ConfirmationModal from './page components/ConfirmationModal';
import ReviewForm from './page components/ReviewForm';

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
    const { name, developer } = this.props.location.state.software;

    return (
      <div className='wrapper rate-wrapper'>
        <div className='breadcrumbs'>
          <a href='/'>Home</a>
          <span> \ </span>
          <a href='/software_details' className='page-link'>
            {name}
          </a>
          <span> \ </span>
          <a href='/rate' className='page-link active-page-link'>
            Rate
          </a>
        </div>

        <section className='software'>
          <SoftwareInfo name={name} developer={developer} />
        </section>

        <ReviewForm showConfirmationModal={this.showConfirmationModal} />

        {this.state.formSubmitted ? <ConfirmationModal /> : null}
      </div>
    );
  }
}

export default Rate;
