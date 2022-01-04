import { auth, database } from '../config/database_config';
import { formatDate } from './common functions/CommonFunctions';
import firebase from 'firebase';
import { alertError } from '../utils/util-functions';

export let userRef, softwaresRef;

export const set = () => {
  userRef = database.collection('Users').doc(id());
  softwaresRef = database.collection('Softwares');
};

export const id = () => auth.currentUser.uid;

export const email = () => auth.currentUser.email;

export const name = () => auth.currentUser.displayName;

export const reviewRef = softwareId =>
  softwaresRef.doc(softwareId).collection('Reviews').doc(id());

export const updateUsername = newName => {
  return auth.currentUser
    .updateProfile({
      displayName: newName,
    })
    .then(() => {
      return userRef.get();
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
          .doc(id())
          .update({
            username: newName,
          });
        if (index === reviewedSoftwares.length - 1) return;
      });
    })
    .catch(error => console.log('Error: ', error));
};

export const deleteUser = password => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email(),
    password
  );
  return auth.currentUser
    .reauthenticateWithCredential(credential)
    .then(() => userRef.delete())
    .then(() => {
      auth.currentUser.delete();
    });
};

export const updatePassword = (oldPassword, newPassword) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email(),
    oldPassword
  );
  return auth.currentUser.reauthenticateWithCredential(credential).then(() => {
    if (oldPassword === newPassword) {
      throw new Error('No change to update');
    } else {
      return auth.currentUser.updatePassword(newPassword);
    }
  });
};

export const canUserReview = softwareID => {
  return database
    .collection('Softwares')
    .doc(softwareID)
    .collection('Reviews')
    .doc(id())
    .get()
    .then(doc => {
      return doc.exists ? false : true;
    });
};

export const updateUserReview = (softwareId, updatedReview) => {
  return reviewRef(softwareId).update({
    date: firebase.firestore.Timestamp.now(),
    ...updatedReview,
  });
};

export const deleteUserReview = async softwareId => {
  try {
    await userRef.update({
      reviewedSoftwares: firebase.firestore.FieldValue.arrayRemove(softwareId),
    });
    return await reviewRef(softwareId).delete();
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const bindUpdaterToUserReviews = async updater => {
  try {
    const doc = await userRef.get();
    if (doc.exists) {
      doc.data().reviewedSoftwares.forEach(softwareId => {
        reviewRef(softwareId).onSnapshot(updater);
      });
    }
  } catch (error) {
    alert(error);
  }
};

export const getUserReviews = async () => {
  try {
    const doc = await userRef.get();

    if (!doc.exists) return [];

    const reviewedSoftwares = doc.data().reviewedSoftwares;

    if (!reviewedSoftwares || reviewedSoftwares.length === 0) return [];

    return await Promise.all(
      reviewedSoftwares.map(async softwareId => {
        let softwareName;
        let doc = await database.collection('Softwares').doc(softwareId).get();

        softwareName = doc.data().name;

        doc = await reviewRef(softwareId).get();

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
};

export const addSoftwareToUserReviews = async softwareID => {
  return database
    .collection('Users')
    .doc(id())
    .update({
      reviewedSoftwares: firebase.firestore.FieldValue.arrayUnion(softwareID),
    });
};

export const createUser = async user => {
  return database
    .collection('Users')
    .doc(id)
    .set({ reviewedSoftwares: [] })
    .catch(alertError);
};

export const signedin = async () => auth.currentUser;

export const emailVerified = async () => auth.currentUser.emailVerified;

// class User {
//   set() {
//     this.userRef = database.collection('Users').doc(this.id);
//     this.softwaresRef = database.collection('Softwares');
//   }

//   get id() {
//     return auth.currentUser.uid;
//   }

//   get email() {
//     return auth.currentUser.email;
//   }

//   get name() {
//     return auth.currentUser.displayName;
//   }

//   reviewRef(softwareId) {
//     return this.softwaresRef.doc(softwareId).collection('Reviews').doc(this.id);
//   }

//   updateUsername(newName) {
//     return auth.currentUser
//       .updateProfile({
//         displayName: newName,
//       })
//       .then(() => {
//         return this.userRef.get();
//       })
//       .then(doc => {
//         return doc.data().reviewedSoftwares;
//       })
//       .then(reviewedSoftwares => {
//         reviewedSoftwares.forEach((softwareID, index) => {
//           database
//             .collection('Softwares')
//             .doc(softwareID)
//             .collection('Reviews')
//             .doc(this.id)
//             .update({
//               username: newName,
//             });
//           if (index === reviewedSoftwares.length - 1) return;
//         });
//       })
//       .catch(error => console.log('Error: ', error));
//   }

//   delete(password) {
//     const credential = firebase.auth.EmailAuthProvider.credential(
//       user.email,
//       password
//     );
//     return auth.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(() => this.userRef.delete())
//       .then(() => {
//         auth.currentUser.delete();
//       });
//   }

//   updatePassword(oldPassword, newPassword) {
//     const credential = firebase.auth.EmailAuthProvider.credential(
//       user.email,
//       oldPassword
//     );
//     return auth.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(() => {
//         if (oldPassword === newPassword) {
//           throw new Error('No change to update');
//         } else {
//           return auth.currentUser.updatePassword(newPassword);
//         }
//       });
//   }

//   canReview(softwareID) {
//     return database
//       .collection('Softwares')
//       .doc(softwareID)
//       .collection('Reviews')
//       .doc(this.id)
//       .get()
//       .then(doc => {
//         return doc.exists ? false : true;
//       });
//   }

//   updateReview(softwareId, updatedReview) {
//     return this.reviewRef(softwareId).update({
//       date: firebase.firestore.Timestamp.now(),
//       ...updatedReview,
//     });
//   }

//   async deleteReview(softwareId) {
//     try {
//       await this.userRef.update({
//         reviewedSoftwares:
//           firebase.firestore.FieldValue.arrayRemove(softwareId),
//       });
//       return await this.reviewRef(softwareId).delete();
//     } catch (error) {
//       console.log('Error: ', error);
//     }
//   }

//   async bindUpdaterToReviews(updater) {
//     try {
//       const doc = await this.userRef.get();
//       if (doc.exists) {
//         doc.data().reviewedSoftwares.forEach(softwareId => {
//           this.reviewRef(softwareId).onSnapshot(updater);
//         });
//       }
//     } catch (error) {
//       alert(error);
//     }
//   }

//   async getReviews() {
//     try {
//       const doc = await this.userRef.get();

//       if (!doc.exists) return [];

//       const reviewedSoftwares = doc.data().reviewedSoftwares;

//       if (!reviewedSoftwares || reviewedSoftwares.length === 0) return [];

//       return await Promise.all(
//         reviewedSoftwares.map(async softwareId => {
//           let softwareName;
//           let doc = await database
//             .collection('Softwares')
//             .doc(softwareId)
//             .get();

//           softwareName = doc.data().name;

//           doc = await this.reviewRef(softwareId).get();

//           const userReview = {
//             softwareId,
//             softwareName,
//             ...doc.data(),
//             date: formatDate(doc.data().date.toDate()),
//           };
//           return userReview;
//         })
//       );
//     } catch (error) {
//       alert(error);
//     }
//   }

//   addSoftwareToReviews(softwareID) {
//     return database
//       .collection('Users')
//       .doc(user.id)
//       .update({
//         reviewedSoftwares: firebase.firestore.FieldValue.arrayUnion(softwareID),
//       });
//   }

//   write(user) {
//     return database
//       .collection('Users')
//       .doc(this.id)
//       .set({ reviewedSoftwares: [] })
//       .catch(alertError);
//   }

//   isSignedin() {
//     return auth.currentUser;
//   }

//   isEmailVerified() {
//     return auth.currentUser.emailVerified;
//   }
// }

// export const user = new User();
