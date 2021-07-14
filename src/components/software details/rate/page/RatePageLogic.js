import { Component } from 'react';
import { CanUserReviewContext } from '../../../../context/CanUserReviewContext';
import AlreadyRatedMessage from './already rated message/AlreadyRatedMessage';
import RatePage from './RatePage';

class RatePageLogic extends Component {
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
    const { formSubmitted } = this.state;

    return (
      <CanUserReviewContext.Consumer>
        {value =>
          value.canUserReview ? (
            <RatePage
              name={name}
              id={id}
              developer={developer}
              formSubmitted={formSubmitted}
              showConfirmationModal={this.showConfirmationModal}
              setCanUserReview={value.setCanUserReview}
            />
          ) : (
            <AlreadyRatedMessage softwareID={id} />
          )
        }
      </CanUserReviewContext.Consumer>
    );
  }
}

export default RatePageLogic;
