import { Component } from 'react';
import { UserContext } from '../../../context/userContext';
import SigninLogic from './SigninLogic';

export class SigninContextConsumer extends Component {
  render() {
    const { from } = this.props;

    return (
      <UserContext.Consumer>
        {value => <SigninLogic {...value} from={from} />}
      </UserContext.Consumer>
    );
  }
}

export default SigninContextConsumer;
