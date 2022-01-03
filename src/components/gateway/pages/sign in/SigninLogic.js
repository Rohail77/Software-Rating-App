import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { authorization } from '../../auth/Authorization';
import Signin from './Signin';

function SigninLogic(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    hasError: false,
    errorMsg: '',
    onWait: false,
    signedin: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    validationCheck()
      ? showError({ msg: 'Please fill all the form fields.' })
      : signin();
  };

  const validationCheck = () => state.email === '' || state.password === '';

  const signin = () => {
    const { email, password } = state;
    authorization.signin({ email, password }, onSignin);
    setState(state => ({
      ...state,
      onWait: true,
    }));
  };

  const onSignin = error => {
    if (error) {
      authorization.signout();
      showError(error);
    } else {
      setState(state => ({
        ...state,
        onWait: false,
        hasError: false,
        errorMsg: '',
        signedin: true,
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
  const { signedin } = state;
  return (
    <Fragment>
      {signedin && <Redirect to='/' />}
      <Signin
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        from={from}
      />
    </Fragment>
  );
}

export default SigninLogic;
