import { auth } from '../../../config/database_config';
import { user } from '../../../database/User';

export class Authorization {
  signout() {
    auth.signOut();
  }

  signup({ email, password, name }, cb) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        user.write();
        userCredential.user.updateProfile({
          displayName: name,
        });
        this.sendVerificationEmail(cb);
      })
      .catch(error => cb({ msg: error.message }));
  }

  sendVerificationEmail(cb) {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        this.signout();
        cb(null);
      })
      .catch(error => cb({ msg: error.message }));
  }

  signin({ email, password }, cb) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // if (user.isEmailVerified())
        cb();
        // else {
        //   cb({
        //     msg: `You have not verified your email. Please verify your email by clicking the link we emailed you at your provided email address (${email}).`,
        //   });
        // }
      })
      .catch(error => cb({ msg: error.message }));
  }

  onLoginDetection(cb) {
    this.handleLoginDetection = cb;
  }

  setAuthorizationStateObserver() {
    auth.onAuthStateChanged(aUser => {
      if (aUser) {
        this.handleLoginDetection(true);
      } else {
        this.handleLoginDetection(false);
      }
    });
  }
}

export const authorization = new Authorization();
authorization.setAuthorizationStateObserver();
