import { UserContext } from '../../../../context/userContext';
import SignupLogic from './SignupLogic';

function SignupContextConsumer({ from }) {
  return (
    <UserContext.Consumer>
      {value => <SignupLogic from={from} handleLogin={value.handleLogin} />}
    </UserContext.Consumer>
  );
}

export default SignupContextConsumer;
