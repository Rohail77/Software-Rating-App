import { auth, database } from '../config/database_config';
import { formatDate } from './common functions/CommonFunctions';
import firebase from 'firebase';
import { alertError } from '../utils/util-functions';

class User {
  set() {
    this.userRef = database.collection('Users').doc(this.id);
    this.softwaresRef = database.collection('Softwares');
  }

  get id() {
    return auth.currentUser.uid;
  }

  get email() {
    return auth.currentUser.email;
  }

  get name() {
    return auth.currentUser.displayName;
  }

  reviewRef(softwareId) {
    return this.softwaresRef.doc(softwareId).collection('Reviews').doc(this.id);
  }

  updateUsername(newName) {
    return auth.currentUser
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        return this.userRef.get();
      })
      .then(doc => {
        return doc.data().reviewedSoftwares;
      })
      .then(reviewedSoftwares => {
        reviewedSoftwares.forEach((softwareID, index) => {
          database
            .collection('Softwares')
            .doc(softwareID)
            .collection('Reviews')
            .doc(this.id)
            .update({
              username: newName,
            });
          if (index === reviewedSoftwares.length - 1) return;
        });
      })
      .catch(error => console.log('Error: ', error));
  }

  delete(password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => this.userRef.delete())
      .then(() => {
        auth.currentUser.delete();
      });
  }

  updatePassword(oldPassword, newPassword) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    return auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        if (oldPassword === newPassword) {
          throw new Error('No change to update');
        } else {
          return auth.currentUser.updatePassword(newPassword);
        }
      });
  }

  canReview(softwareID) {
    return database
      .collection('Softwares')
      .doc(softwareID)
      .collection('Reviews')
      .doc(this.id)
      .get()
      .then(doc => {
        return doc.exists ? false : true;
      });
  }

  updateReview(softwareId, updatedReview) {
    return this.reviewRef(softwareId).update({
      date: firebase.firestore.Timestamp.now(),
      ...updatedReview,
    });
  }

  async deleteReview(softwareId) {
    try {
      await this.userRef.update({
        reviewedSoftwares:
          firebase.firestore.FieldValue.arrayRemove(softwareId),
      });
      return await this.reviewRef(softwareId).delete();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async bindUpdaterToReviews(updater) {
    try {
      const doc = await this.userRef.get();
      if (doc.exists) {
        doc.data().reviewedSoftwares.forEach(softwareId => {
          this.reviewRef(softwareId).onSnapshot(updater);
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  async getReviews() {
    try {
      const doc = await this.userRef.get();

      if (!doc.exists) return [];

      const reviewedSoftwares = doc.data().reviewedSoftwares;

      if (!reviewedSoftwares || reviewedSoftwares.length === 0) return [];

      return await Promise.all(
        reviewedSoftwares.map(async softwareId => {
          let softwareName;
          let doc = await database
            .collection('Softwares')
            .doc(softwareId)
            .get();

          softwareName = doc.data().name;

          doc = await this.reviewRef(softwareId).get();

          const userReview = {
            softwareId,
            softwareName,
            ...doc.data(),
            date: formatDate(doc.data().date.toDate()),
          };
          return userReview;
        })
      );
    } catch (error) {
      alert(error);
    }
  }

  addSoftwareToReviews(softwareID) {
    return database
      .collection('Users')
      .doc(user.id)
      .update({
        reviewedSoftwares: firebase.firestore.FieldValue.arrayUnion(softwareID),
      });
  }

  write(user) {
    return database
      .collection('Users')
      .doc(this.id)
      .set({ reviewedSoftwares: [] })
      .catch(alertError);
  }

  isSignedin() {
    return auth.currentUser;
  }

  isEmailVerified() {
    return auth.currentUser.emailVerified;
  }
}

export const user = new User();
