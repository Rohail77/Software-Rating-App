import { Component } from 'react';
import ConfirmationModal from './page components/confirmation modal/ConfirmationModal';
import ReviewForm from './page components/review form/ReviewForm';
import { Link } from 'react-router-dom';
import HomeLink from '../../../common/home link/HomeLink';
import Software from './page components/software info/Software';

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
              pathname: `/software_details/${id}/rate`,
            }}
          >
            Rate
          </Link>
        </div>

        <Software name={name} developer={developer}/>

        <ReviewForm
          showConfirmationModal={this.showConfirmationModal}
          softwareID={id}
        />

        {this.state.formSubmitted ? (
          <ConfirmationModal softwareID={id} />
        ) : null}
      </div>
    );
  }
}

export default Rate;
