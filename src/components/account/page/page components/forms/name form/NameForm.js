import { createRef, useState, useEffect } from 'react';
import { user } from '../../../../../../database/User';

function NameForm(props) {
  const [state, setState] = useState({
    name: user.name,
    activated: false,
    updated: false,
    error: false,
    errorMsg: '',
  });

  const data = {
    errorMsg: '',
  };

  const nameFieldRef = createRef();

  const handleChange = event =>
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    updateName();
  };

  const removeExtraSpaces = value =>
    value
      .split(' ')
      .filter(s => s)
      .join(' ');

  const updateName = () => {
    if (!validate()) {
      showErrorMessage(data.errorMsg);
      setTimeout(hideErrorMessage, 2000);
      return;
    }

    const { wait, stopWait } = props;
    wait();
    user.updateUsername(removeExtraSpaces(state.name)).then(() => {
      stopWait();
      deactivateForm();
      showSuccessMessage();
    });
  };

  const validate = () => {
    const { name } = state;
    if (name === '') {
      data.errorMsg = 'Name field is empty';
      return false;
    }
    if (name.length < 2) {
      data.errorMsg = 'Name should be at least 2 characters long';
      return false;
    }
    if (user.name === name) {
      data.errorMsg = 'No change to update';
      return false;
    }
    return true;
  };

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
    nameFieldRef.current.focus();
  };

  const deactivateForm = () =>
    setState(state => ({
      ...state,
      activated: false,
    }));

  const reset = () =>
    setState(state => ({
      ...state,
      name: user.name,
      activated: false,
    }));

  const { name, activated, updated, error, errorMsg } = state;

  return (
    <form className='name-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          className='input-field'
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={handleChange}
          disabled={!activated}
          ref={nameFieldRef}
          maxLength={50}
        />
      </div>
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
      {updated && <p className='success-msg'>* Name Changed</p>}
      {error && <p className='error-msg'>* {errorMsg}</p>}
    </form>
  );
}

export default NameForm;
