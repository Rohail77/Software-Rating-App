import { Component } from 'react';
import { UserContext } from '../../../context/userContext';
import SignupLogic from './SignupLogic';

class SignupContextConsumer extends Component {
  render() {
    const { from } = this.props;

    return (
      <UserContext.Consumer>
        {value => <SignupLogic from={from} handleLogin={value.handleLogin} />}
      </UserContext.Consumer>
    );
  }
}

export default SignupContextConsumer;
