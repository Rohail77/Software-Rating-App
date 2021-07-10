import { Component, Fragment } from 'react';
import { authorization } from '../auth/Authorization';
import SigninLogic from '../sign in/SigninLogic';
import Signup from './Signup';

class SignupLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      signedUp: false,
      hasError: false,
      errorMsg: '',
      onWait: false,
      emailVerified: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validationCheck()
      ? this.showError({ msg: 'Please fill all the form fields.' })
      : this.signup();
  }

  validationCheck() {
    const { email, password, name } = this.state;
    return email === '' || password === '' || name === '';
  }

  signup() {
    const { email, password } = this.state;
    authorization.signup({ email, password }, this.onSignup);
    this.setState({
      onWait: true,
    });
  }

  onSignup(error) {
    if (error) {
      this.showError(error);
    } else {
      this.setState({
        onWait: false,
        signedUp: true,
        hasError: false,
        errorMsg: '',
      });
    }
  }

  showError(error) {
    this.setState({
      onWait: false,
      hasError: true,
      errorMsg: error.msg,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { emailVerified } = this.state;

    return (
      <Fragment>
        {emailVerified ? (
          <SigninLogic />
        ) : (
          <Signup
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            isEmailVerified={this.isEmailVerified}
          />
        )}
      </Fragment>
    );
  }
}

export default SignupLogic;
