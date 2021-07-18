import { Component } from 'react';
import { user } from '../../../../../../database/User';

class EmailForm extends Component {
  render() {
    return (
      <form className='email-form'>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            className='input-field'
            type='email'
            name='email'
            id='email'
            value={user.email}
            disabled
          />
        </div>
      </form>
    );
  }
}

export default EmailForm;
