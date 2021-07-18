import { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeLink from '../../common/home link/HomeLink';
import WaitMessage from '../../common/wait message/WaitMessage';
import DangerZone from './page components/danger zone/DangerZone';
import Forms from './page components/forms/Forms';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onWait: false,
    };
    this.wait = this.wait.bind(this);
    this.stopWait = this.stopWait.bind(this);
  }

  wait() {
    this.setState({
      onWait: true,
    });
  }

  stopWait() {
    this.setState({
      onWait: false,
    });
  }
  render() {
    const { onWait } = this.state;

    return (
      <div className='wrapper account-wrapper'>
        <header>
          <div className='breadcrumbs'>
            <HomeLink />
            <span> \ </span>
            <Link className='page-link active-page-link' to='/account'>
              Account
            </Link>
          </div>
        </header>

        <Forms wait={this.wait} stopWait={this.stopWait} />

        <DangerZone wait={this.wait} stopWait={this.stopWait} />
        {onWait ? <WaitMessage /> : null}
      </div>
    );
  }
}

export default AccountPage;
