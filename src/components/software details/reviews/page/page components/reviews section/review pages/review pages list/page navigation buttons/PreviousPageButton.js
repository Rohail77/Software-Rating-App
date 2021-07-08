import { Component } from 'react';

class PreviousPageButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {updateCurrentPage, currentPage} = this.props;
    updateCurrentPage(currentPage - 1);
  }

  render() {
    const { isDisabled } = this.props;

    return (
      <li>
        <button
          className={`page${isDisabled ? '' : ' page--clickable'}`}
          onClick={this.handleClick}
          disabled={isDisabled}
          style={{ cursor: `${isDisabled ? 'auto' : 'pointer'}` }}
        >
          <img src='/images/left_arrow.svg' alt='left arrow' />
        </button>
      </li>
    );
  }
}

export default PreviousPageButton;
