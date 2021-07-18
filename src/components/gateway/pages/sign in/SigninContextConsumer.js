import { UserContext } from '../../../../context/userContext';
import SigninLogic from './SigninLogic';

function SigninContextConsumer({ from }) {
  return (
    <UserContext.Consumer>
      {value => <SigninLogic {...value} from={from} />}
    </UserContext.Consumer>
  );
}

export default SigninContextConsumer;
