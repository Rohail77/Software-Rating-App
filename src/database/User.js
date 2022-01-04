import { auth, database } from '../config/database_config';
import firebase from 'firebase';
import { alertError, formatDate } from '../utils/util-functions';
import { formatReview, softwaresRef, userReview } from './common';

export let userRef;

export const set = () => {
  userRef = database.collection('Users').doc(id());
};

export const id = () => auth.currentUser.uid;

export const email = () => auth.currentUser.email;

export const name = () => auth.currentUser.displayName;

export const reviewRef = softwareId =>
  softwaresRef.doc(softwareId).collection('Reviews').doc(id());

export const getUserReview = async softwareId => {
  const doc = await userReview(softwareId);
  return formatReview(doc);
};

export const updateUsername = async newName => {
  try {
    await auth.currentUser.updateProfile({
      displayName: newName,
    });

    const doc = await userRef.get();

    return await Promise.all(
      doc.data().reviewedSoftwares.map(softwareId =>
        reviewRef(softwareId).update({
          username: newName,
        })
      )
    );
  } catch (error) {
    console.log('Error: ', error);
  }
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

export const updatePassword = async (oldPassword, newPassword) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email(),
    oldPassword
  );
  await auth.currentUser.reauthenticateWithCredential(credential);
  return await auth.currentUser.updatePassword(newPassword);
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

export const createUser = async () => {
  try {
    return await database
      .collection('Users')
      .doc(id())
      .set({ reviewedSoftwares: [] });
  } catch (error) {
    alertError();
  }
};

export const signedin = () => auth.currentUser;

export const emailVerified = () => auth.currentUser.emailVerified;
