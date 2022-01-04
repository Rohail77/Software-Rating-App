import { useState } from 'react';
import { authorization } from '../../auth/Authorization';
import Signup from './Signup';

function SignupLogic(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    signedUp: false,
    hasError: false,
    errorMsg: '',
    onWait: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    validationCheck()
      ? showError({ msg: 'Please fill all the form fields.' })
      : signup();
  };

  const validationCheck = () => {
    const { email, password, name } = state;
    return email === '' || password === '' || name === '';
  };

  const signup = async () => {
    setState(state => ({
      ...state,
      onWait: true,
    }));
    const { email, password, name } = state;
    const error = await authorization.signup({ email, password, name });
    if (error) {
      showError(error);
    } else {
      setState(state => ({
        ...state,
        onWait: false,
        signedUp: true,
        hasError: false,
        errorMsg: '',
      }));
    }
  };

  const showError = error =>
    setState(state => ({
      ...state,
      onWait: false,
      hasError: true,
      errorMsg: error.msg,
    }));

  const handleChange = event =>
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const { from } = props;

  return (
    <Signup
      {...state}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      from={from}
    />
  );
}

export default SignupLogic;
