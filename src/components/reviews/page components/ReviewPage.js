import { Component } from 'react';

class ReviewPage extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const {updateCurrentPage, pageNumber} = this.props;
    updateCurrentPage(pageNumber)
  }

  render() {
    const { pageNumber, isActive } = this.props;

    return (
      <li>
        <button
          className={`page page--clickable${isActive ? ' active-review-page' : ''}`}
          onClick={this.handleClick}
        >
          {pageNumber}
        </button>
      </li>
    );
  }
}

export default ReviewPage;
