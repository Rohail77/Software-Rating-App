import { auth } from '../../../config/database_config';

export class Authorization {

  signout() {
    auth.signOut();
  }

  isEmailVerified() {
    return auth.currentUser.emailVerified;
  }

  isSignedin() {
    return auth.currentUser;
  }

  signup({ email, password }, cb) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        sendVerificationEmail(cb);
      })
      .catch(error => {
        cb({ msg: error.message });
      });

    function sendVerificationEmail(cb) {
      auth.currentUser
        .sendEmailVerification()
        .then(() => {
          cb(null);
        })
        .catch(error => {
          cb({ msg: error.message });
        });
    }
  }

  signin({ email, password }, cb) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (this.isEmailVerified()) cb();
        else {
          cb({
            msg: `You have not verified your email. Please verify your email by clicking the link we emailed you at your provided email address (${email}).`,
          });
        }
      })
      .catch(error => {
        cb({ msg: error.message });
      });
  }

  setAuthorizationStateObserver() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user signed in');
        this.loggedin = true;
      } else {
        console.log('user signed out');
        this.loggedin = false;
      }
    });
  }
}

export const authorization = new Authorization();
authorization.setAuthorizationStateObserver();
