import { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { authorization } from '../auth/Authorization';
import Signin from './Signin';

class SigninLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hasError: false,
      errorMsg: '',
      onWait: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignin = this.onSignin.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validationCheck()
      ? this.showError({ msg: 'Please fill all the form fields.' })
      : this.signin();
  }

  validationCheck() {
    const { email, password } = this.state;
    return email === '' || password === '';
  }

  signin() {
    const { email, password } = this.state;
    authorization.signin({ email, password }, this.onSignin);
    this.setState({
      onWait: true,
    });
  }

  onSignin(error) {
    if (error) {
      authorization.signout();
      this.showError(error);
    } else {
      const { setLogin } = this.props;
      this.setState(
        {
          onWait: false,
          hasError: false,
          errorMsg: '',
        },
        () => setLogin(true)
      );
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
    const { loggedin, from } = this.props;
    return (
      <Fragment>
        {loggedin ? <Redirect to='/' /> : null}
        <Signin
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          from={from}
        />
      </Fragment>
    );
  }
}

export default SigninLogic;
