import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authErrors, authorization } from '../../auth/Authorization';
import Signin from './Signin';
import { logout } from '../../../../features/authSlice';

function SigninLogic(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    hasError: false,
    errorMsg: '',
    onWait: false,
    signinComplete: false,
  });

  const dispatch = useDispatch();
  const loggedin = useSelector(state => state.loggedin);

  const handleSubmit = event => {
    event.preventDefault();
    validationCheck()
      ? showError({ msg: 'Please fill all the form fields.' })
      : signin();
  };

  const validationCheck = () => state.email === '' || state.password === '';

  const signin = async () => {
    const { email, password } = state;
    setState(state => ({
      ...state,
      onWait: true,
    }));
    const error = await authorization.signin({ email, password });
    if (error) {
      if (error.type === authErrors.EMAIL_UNVERIFIED) {
        authorization.signout();
        dispatch(logout());
      }
      showError(error);
    } else {
      setState(state => ({
        ...state,
        signinComplete: true,
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

  return (
    <>
      {loggedin && state.signinComplete && <Redirect to='/' />}
      <Signin
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        from={props.from}
      />
    </>
  );
}

export default SigninLogic;
