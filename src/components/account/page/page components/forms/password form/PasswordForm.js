import { createRef, Fragment, useEffect, useState } from 'react';
import { user } from '../../../../../../database/User';

function PasswordForm(props) {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    activated: false,
    updated: false,
    error: false,
    errorMsg: '',
  });

  const passwordFieldRef = createRef();

  const handleChange = event =>
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    if (validate()) {
      const { oldPassword, newPassword } = state;
      const { wait, stopWait } = props;
      wait();
      user
        .updatePassword(oldPassword, newPassword)
        .then(() => {
          stopWait();
          deactivateForm();
          showSuccessMessage();
          reset();
        })
        .catch(error => {
          stopWait();
          showErrorMessage(error.message);
          setTimeout(hideErrorMessage, 2000);
        });
    } else {
      showErrorMessage('The form is not filled completely');
      setTimeout(hideErrorMessage, 2000);
    }
  };

  const validate = () => state.oldPassword !== '' && state.newPassword !== '';

  const showSuccessMessage = () =>
    setState(state => ({
      ...state,
      updated: true,
    }));

  useEffect(() => {
    if (state.updated) setTimeout(hideSuccessMessage, 2000);
  }, [state.updated]);

  const hideSuccessMessage = () =>
    setState(state => ({
      ...state,
      updated: false,
    }));

  const showErrorMessage = errorMsg =>
    setState(state => ({
      ...state,
      error: true,
      errorMsg,
    }));

  const hideErrorMessage = () =>
    setState(state => ({
      ...state,
      error: false,
      errorMsg: '',
    }));

  const activateForm = () => {
    setState(state => ({
      ...state,
      activated: true,
    }));
    passwordFieldRef.current.focus();
  };

  const deactivateForm = () =>
    setState(state => ({
      ...state,
      activated: false,
    }));

  const reset = () =>
    setState(state => ({
      ...state,
      oldPassword: '',
      newPassword: '',
      activated: false,
    }));

  const { oldPassword, newPassword, activated, updated, error, errorMsg } =
    state;
  return (
    <form className='password-form' onSubmit={handleSubmit}>
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
              onChange={handleChange}
              ref={passwordFieldRef}
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
              onChange={handleChange}
              placeholder='At least 6 characters long'
              maxLength={30}
            />
            {error && <p className='error-msg'>* {errorMsg}</p>}
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
            onChange={handleChange}
            ref={passwordFieldRef}
            disabled={!activated}
          />
        </div>
      )}
      {activated ? (
        <div className='ctas'>
          <input type='submit' className='save-btn' value='Save'></input>
          <button type='button' className='cancel-btn' onClick={reset}>
            Cancel{' '}
          </button>
        </div>
      ) : (
        <div className='ctas'>
          <button className='change-btn' onClick={activateForm}>
            Change{' '}
          </button>
        </div>
      )}
      {updated && <p className='success-msg'>* Password Changed</p>}
    </form>
  );
}

export default PasswordForm;
