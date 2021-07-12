import { Component } from 'react';
import { CanUserReviewContext } from '../../../../context/CanUserReviewContext';
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
        {canUserReview =>
          canUserReview ? (
            <RatePage
              name={name}
              id={id}
              developer={developer}
              formSubmitted={formSubmitted}
            />
          ) : null
        }
      </CanUserReviewContext.Consumer>
    );
  }
}

export default RatePageLogic;
