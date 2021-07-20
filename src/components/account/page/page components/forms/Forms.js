import EmailForm from './email form/EmailForm';
import NameForm from './name form/NameForm';
import PasswordForm from './password form/PasswordForm';

function Forms({ wait, stopWait }) {
  return (
    <section className='forms'>
      <EmailForm />

      <NameForm wait={wait} stopWait={stopWait} />

      <PasswordForm wait={wait} stopWait={stopWait} />
    </section>
  );
}

export default Forms;
