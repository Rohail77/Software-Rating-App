import { Component } from 'react';
import EmailForm from './email form/EmailForm';
import NameForm from './name form/NameForm';
import PasswordForm from './password form/PasswordForm';

class Forms extends Component {
  render() {
    const { wait, stopWait } = this.props;

    return (
      <section className='forms'>
        <EmailForm />

        <NameForm wait={wait} stopWait={stopWait} />

        <PasswordForm wait={wait} stopWait={stopWait} />
      </section>
    );
  }
}

export default Forms;
