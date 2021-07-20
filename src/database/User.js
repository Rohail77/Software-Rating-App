import { auth, database } from '../config/database_config';
import { formatDate } from './common functions/CommonFunctions';
import firebase from 'firebase';

class User {
  set(cb = null) {
    this.userRef = database.collection('Users').doc(this.id);
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

  canReview(softwareID, cb) {
    database
      .collection('Softwares')
      .doc(softwareID)
      .collection('Reviews')
      .doc(this.id)
      .get()
      .then(doc => {
        doc.exists ? cb(false) : cb(true);
      });
  }

  updateReview(softwareID, updatedReview) {
    return database
      .collection('Softwares')
      .doc(softwareID)
      .collection('Reviews')
      .doc(this.id)
      .update({
        date: firebase.firestore.Timestamp.now(),
        ...updatedReview,
      });
  }

  deleteReview(softwareID) {
    return this.userRef
      .update({
        reviewedSoftwares:
          firebase.firestore.FieldValue.arrayRemove(softwareID),
      })
      .then(() => {
        return database
          .collection('Softwares')
          .doc(softwareID)
          .collection('Reviews')
          .doc(this.id)
          .delete();
      })
      .catch(error => console.log('Error: ', error));
  }

  bindUpdaterToReviews(updater) {
    this.userRef.get().then(doc => {
      if (doc.exists) {
        doc.data().reviewedSoftwares.forEach(softwareID => {
          database
            .collection('Softwares')
            .doc(softwareID)
            .collection('Reviews')
            .doc(this.id)
            .onSnapshot(updater);
        });
      }
    });
  }

  getReviews(cb) {
    const userReviews = [];
    this.userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          cb(userReviews);
          return false;
        }
        return doc.data().reviewedSoftwares;
      })
      .then(reviewedSoftwares => {
        if (!reviewedSoftwares || reviewedSoftwares.length === 0) {
          cb(userReviews);
          return;
        }
        reviewedSoftwares.forEach((softwareID, index) => {
          let softwareName;
          database
            .collection('Softwares')
            .doc(softwareID)
            .get()
            .then(doc => {
              softwareName = doc.data().name;
              return database
                .collection('Softwares')
                .doc(softwareID)
                .collection('Reviews')
                .doc(this.id)
                .get();
            })
            .then(doc => {
              userReviews.unshift({
                softwareID,
                softwareName,
                ...doc.data(),
                date: formatDate(doc.data().date.toDate()),
              });
              if (index + 1 === reviewedSoftwares.length) cb(userReviews);
            });
        });
      })
      .catch(error => console.log('Error: ', error));
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
      .catch(error => console.log('Error: ', error));
  }

  isSignedin() {
    return auth.currentUser;
  }

  isEmailVerified() {
    return auth.currentUser.emailVerified;
  }
}

export const user = new User();
