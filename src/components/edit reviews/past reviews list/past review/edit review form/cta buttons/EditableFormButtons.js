import { Component } from 'react';

class EditableFormButtons extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.reset = this.reset.bind(this);
  }

  save(event) {
    event.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  reset(event) {
    event.preventDefault();
    const { reset } = this.props;
    reset();
  }

  render() {
    return (
      <div className='past-review__ctas'>
        <a href='save' className='save-btn' onClick={this.save}>
          Save
        </a>
        <a href='cancel' className='cancel-btn' onClick={this.reset}>
          Cancel
        </a>
      </div>
    );
  }
}

export default EditableFormButtons;
