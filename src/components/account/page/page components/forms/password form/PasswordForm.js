import { Component, createRef, Fragment } from 'react';
import { user } from '../../../../../../database/User';

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      activated: false,
      updated: false,
      error: false,
      errorMsg: '',
    };
    this.passwordFieldRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activateForm = this.activateForm.bind(this);
    this.deactivateForm = this.deactivateForm.bind(this);
    this.hideSuccessMessage = this.hideSuccessMessage.bind(this);
    this.reset = this.reset.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const { oldPassword, newPassword } = this.state;
      const { wait, stopWait } = this.props;
      wait();
      user
        .updatePassword(oldPassword, newPassword)
        .then(() => {
          stopWait();
          this.deactivateForm();
          this.showSuccessMessage();
          this.reset();
        })
        .catch(error => {
          stopWait();
          this.showErrorMessage(error.message);
          setTimeout(this.hideErrorMessage, 2000);
        });
    } else {
      this.showErrorMessage('The form is not filled completely');
      setTimeout(this.hideErrorMessage, 2000);
    }
  }

  validate() {
    const { oldPassword, newPassword } = this.state;
    return oldPassword !== '' && newPassword !== '';
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
      () => this.passwordFieldRef.current.focus()
    );
  }

  deactivateForm() {
    this.setState({
      activated: false,
    });
  }

  reset() {
    this.setState({
      oldPassword: '',
      newPassword: '',
      activated: false,
    });
  }

  render() {
    const { oldPassword, newPassword, activated, updated, error, errorMsg } =
      this.state;
    return (
      <form className='password-form' onSubmit={this.handleSubmit}>
        {activated ? (
          <Fragment>
            <div>
              <label htmlFor='old-password'>Enter Old Password</label>
              <input
                className='input-field'
                type='password'
                name='oldPassword'
                id='old-password'
                value={oldPassword}
                onChange={this.handleChange}
                ref={this.passwordFieldRef}
                maxLength={30}
              />
            </div>
            <div>
              <label htmlFor='new-password'>Enter New Password</label>
              <input
                className='input-field'
                type='password'
                name='newPassword'
                id='new-password'
                value={newPassword}
                onChange={this.handleChange}
                placeholder='At least 6 characters long'
                maxLength={30}
              />
              {error ? <p className='error-msg'>* {errorMsg}</p> : null}
            </div>
          </Fragment>
        ) : (
          <div>
            <label htmlFor='password'>Password</label>
            <input
              className='input-field'
              type='password'
              name='password'
              id='password'
              value='******'
              onChange={this.handleChange}
              ref={this.passwordFieldRef}
              disabled={!activated}
            />
          </div>
        )}
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
        {updated ? <p className='success-msg'>* Password Changed</p> : null}
      </form>
    );
  }
}

export default PasswordForm;
