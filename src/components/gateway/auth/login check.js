import { auth } from '../../../config/database_config';

export let loggedin;
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user signed in');
    loggedin = true;
  } else {
    loggedin = false;
    console.log('user signed out');
  }
});
