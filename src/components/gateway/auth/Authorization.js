import { auth } from '../../../config/database_config';
import { createUser, emailVerified } from '../../../database/User';

export const authErrors = {
  EMAIL_UNVERIFIED: 'EMAIL_UNVERIFIED',
  INCORRECT_LOGIN_CREDENTIALS: 'INCORRECT_LOGIN_CREDENTIALS',
};

export class Authorization {
  signout() {
    auth.signOut();
  }

  async signup({ email, password, name }) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await Promise.all([
        userCredential.user.updateProfile({
          displayName: name,
        }),
        createUser(),
        this.sendVerificationEmail(),
      ]);
      this.signout();
    } catch (error) {
      return {
        msg: error.message,
      };
    }
  }

  async sendVerificationEmail() {
    return await auth.currentUser.sendEmailVerification();
  }

  async signin({ email, password }) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      return null;
      // if (emailVerified()) return null;
      // else {
      //   return {
      //     type: authErrors.EMAIL_UNVERIFIED,
      //     msg: `You have not verified your email. Please verify your email by clicking the link we emailed you at your provided email address (${email})`,
      //   };
      // }
    } catch (error) {
      return {
        type: authErrors.INCORRECT_LOGIN_CREDENTIALS,
        msg: error.message,
      };
    }
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
