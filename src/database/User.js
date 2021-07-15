import { auth, database } from '../config/database_config';
import { formatDate } from './common functions/CommonFunctions';
import firebase from 'firebase';

class User {
  set(cb = null) {
    this.email = auth.currentUser.email;
    this.userRef = database.collection('Users').doc(this.email);
    this.setName(cb);
  }

  setName(cb = null) {
    this.userRef.get().then(doc => {
      this.name = doc.data().name;
      if (cb) cb();
    });
  }

  isEmailVerified() {
    return auth.currentUser.emailVerified;
  }

  updateUserName(newName) {
    this.userRef
      .update({
        name: newName,
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser() {
    this.userRef
      .delete()
      .then(() => {
        console.log('User deleted Successfully');
      })
      .catch(error => {
        console.log(error);
      });
  }

  canReview(softwareID, cb) {
    database
      .collection('Softwares')
      .doc(softwareID)
      .collection('Reviews')
      .doc(this.email)
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
      .doc(this.email)
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
          .doc(this.email)
          .delete();
      })
      .catch(error => console.log(error));
  }

  bindUpdaterToReviews(updater) {
    this.userRef.get().then(doc => {
      doc.data().reviewedSoftwares.forEach(softwareID => {
        database
          .collection('Softwares')
          .doc(softwareID)
          .collection('Reviews')
          .doc(this.email)
          .onSnapshot(updater);
      });
    });
  }

  getReviews(cb) {
    const userReviews = [];
    this.userRef
      .get()
      .then(doc => {
        return doc.data().reviewedSoftwares;
      })
      .then(reviewedSoftwares => {
        if (reviewedSoftwares.length === 0) {
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
                .doc(this.email)
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
      .catch(error => console.log(error));
  }

  addSoftwareToReview(softwareID, cb) {
    return database
      .collection('Users')
      .doc(user.email)
      .update({
        reviewedSoftwares: firebase.firestore.FieldValue.arrayUnion(softwareID),
      });
  }

  writeUser(user, cb) {
    database
      .collection('Users')
      .doc(user.email)
      .set(user)
      .then(() => {
        if (cb) cb();
      })
      .catch(error => {
        console.log(error);
      });
  }

  isSignedin() {
    return auth.currentUser;
  }
}

export const user = new User();
