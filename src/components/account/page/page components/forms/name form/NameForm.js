import { Component, createRef } from 'react';
import { user } from '../../../../../../database/User';

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: user.name,
      activated: false,
      updated: false,
      error: false,
      errorMsg: '',
    };
    this.data = {
      errorMsg: '',
    };
    this.nameFieldRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activateForm = this.activateForm.bind(this);
    this.deactivateForm = this.deactivateForm.bind(this);
    this.hideSuccessMessage = this.hideSuccessMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.removeExtraSpaces();
  }

  removeExtraSpaces() {
    this.setState(
      state => ({
        name: state.name
          .split(' ')
          .filter(s => s)
          .join(' '),
      }),
      this.updateName
    );
  }

  updateName() {
    if (!this.validate()) {
      this.showErrorMessage(this.data.errorMsg);
      setTimeout(this.hideErrorMessage, 2000);
      return;
    }

    const { name } = this.state;
    const { wait, stopWait } = this.props;
    wait();
    user.updateUsername(name).then(() => {
      stopWait();
      this.deactivateForm();
      this.showSuccessMessage();
    });
  }

  validate() {
    const { name } = this.state;
    if (name === '') {
      this.data.errorMsg = 'Name field is empty';
      return false;
    }
    if (name.length < 2) {
      this.data.errorMsg = 'Name should be at least 2 characters long';
      return false;
    }
    if (user.name === name) {
      this.data.errorMsg = 'No change to update';
      return false;
    }
    return true;
  }

  isChange() {
    const { name } = this.state;
    return user.name !== name;
  }

  showSuccessMessage() {
    this.setState(
      {
        updated: true,
      },
      () => {
        setTimeout(this.hideSuccessMessage, 2000);
      }
    );
  }

  hideSuccessMessage() {
    this.setState({
      updated: false,
    });
  }

  showErrorMessage(errorMsg) {
    this.setState({
      error: true,
      errorMsg,
    });
  }

  hideErrorMessage() {
    this.setState({
      error: false,
      errorMsg: '',
    });
  }

  activateForm() {
    this.setState(
      {
        activated: true,
      },
      () => this.nameFieldRef.current.focus()
    );
  }

  deactivateForm() {
    this.setState({
      activated: false,
    });
  }

  reset() {
    this.setState({
      name: user.name,
      activated: false,
    });
  }

  render() {
    const { name, activated, updated, error, errorMsg } = this.state;

    return (
      <form className='name-form' onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            className='input-field'
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={this.handleChange}
            disabled={!activated}
            ref={this.nameFieldRef}
            maxLength={50}
          />
        </div>
        {activated ? (
          <div className='ctas'>
            <input type='submit' className='save-btn' value='Save'></input>
            <button type='button' className='cancel-btn' onClick={this.reset}>
              Cancel{' '}
            </button>
          </div>
        ) : (
          <div className='ctas'>
            <button className='change-btn' onClick={this.activateForm}>
              Change{' '}
            </button>
          </div>
        )}
        {updated ? <p className='success-msg'>* Name Changed</p> : null}
        {error ? <p className='error-msg'>* {errorMsg}</p> : null}
      </form>
    );
  }
}

export default NameForm;
