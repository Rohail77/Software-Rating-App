import { Component } from 'react';

class NonEditableFormButtons extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit(event) {
    event.preventDefault();
    const { setEditable} = this.props;
    setEditable(true);
  }

  delete(event) {
    event.preventDefault();
    const { handleDelete } = this.props;
    handleDelete();
  }

  render() {
    const { clickable } = this.props;

    return (
      <div className='past-review__ctas'>
        <a href='edit' className='edit-btn tooltip' onClick={this.edit}>
          <img src='/images/edit.svg' alt='pencil' />
          <span className='tooltip-text'>Edit</span>
        </a>
        <a href='delete' className='delete-btn tooltip' onClick={this.delete}>
          <img src='/images/delete.svg' alt='dustbin' />
          <span className='tooltip-text'>Delete</span>
        </a>
        {clickable ? null : <div className='past-review__ctas__wrapper'> </div>}
      </div>
    );
  }
}

export default NonEditableFormButtons;
