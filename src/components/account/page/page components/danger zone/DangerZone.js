import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { deleteUser } from '../../../../../database/User';

function DangerZone(props) {
  const [state, setState] = useState({
    password: '',
    deleted: false,
    error: false,
    errorMsg: '',
  });

  const handleChange = event =>
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    const { password } = state;
    const { wait, stopWait } = props;
    wait();
    deleteUser(password)
      .then(() => {
        stopWait();
        setState(state => ({
          ...state,
          deleted: true,
        }));
      })
      .catch(error => {
        stopWait();
        showError(error.message);
      });
  };

  const showError = errorMsg =>
    setState(state => ({
      ...state,
      error: true,
      errorMsg,
    }));

  const reset = () =>
    setState({
      password: '',
      error: false,
      errorMsg: '',
    });

  const closeErrorMessage = event => {
    event.preventDefault();
    reset();
  };

  const { password, deleted, error, errorMsg } = state;
  return (
    <Fragment>
      {deleted && <Redirect to='/' />}
      <section className='danger-zone'>
        <h2 className='danger-zone__h'>Danger Zone</h2>
        <h1 className='danger-zone__delete-h'>Delete account</h1>
        <div className='danger-zone__cta'>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={handleChange}
          />
          <button
            type='button'
            className={`danger-zone__delete-btn${
              password.length < 6 ? ' danger-zone__delete-btn--disabled' : ''
            }`}
            onClick={handleSubmit}
          >
            Delete
          </button>
        </div>
        {error && (
          <div className='danger-zone__error-msg'>
            <a
              href='close'
              className='danger-zone__error-msg__cross'
              onClick={closeErrorMessage}
            >
              <img src='/images/cross.svg' alt='cross' />{' '}
            </a>
            <p className='danger-zone__error-msg__para'>{errorMsg}</p>
          </div>
        )}
        <p className='danger-zone__warning-para'>
          Deleting your account will not delete your ratings history. Delete it
          manually if you desire to.
        </p>
      </section>
    </Fragment>
  );
}

export default DangerZone;
