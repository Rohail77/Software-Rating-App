import { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { user } from '../../../../../database/User';

class DangerZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      deleted: false,
      error: false,
      errorMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeErrorMessage = this.closeErrorMessage.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password } = this.state;
    const { wait, stopWait } = this.props;
    wait();
    user
      .delete(password)
      .then(() => {
        stopWait();
        this.setState({
          deleted: true,
        });
      })
      .catch(error => {
        stopWait();
        this.showError(error.message);
      });
  }

  showError(errorMsg) {
    this.setState({
      error: true,
      errorMsg,
    });
  }

  reset() {
    this.setState({
      password: '',
      error: false,
      errorMsg: '',
    });
  }

  closeErrorMessage(event) {
    event.preventDefault();
    this.reset();
  }

  render() {
    const { password, deleted, error, errorMsg } = this.state;
    return (
      <Fragment>
        {deleted ? <Redirect to='/' /> : null}
        <section className='danger-zone'>
          <h2 className='danger-zone__h'>Danger Zone</h2>
          <h1 className='danger-zone__delete-h'>Delete account</h1>
          <div className='danger-zone__cta'>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={this.handleChange}
            />
            <button
              type='button'
              className={`danger-zone__delete-btn${
                password.length < 6 ? ' danger-zone__delete-btn--disabled' : ''
              }`}
              onClick={this.handleSubmit}
            >
              Delete
            </button>
          </div>
          {error ? (
            <div className='danger-zone__error-msg'>
              <a
                href='close'
                className='danger-zone__error-msg__cross'
                onClick={this.closeErrorMessage}
              >
                <img src='/images/cross.svg' alt='cross' />{' '}
              </a>
              <p className='danger-zone__error-msg__para'>{errorMsg}</p>
            </div>
          ) : null}
          <p className='danger-zone__warning-para'>Deleting your account will not delete your ratings history. Delete it manually if you desire to.</p>
        </section>
      </Fragment>
    );
  }
}

export default DangerZone;
