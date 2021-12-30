import { database } from '../config/database_config';
import firebase from 'firebase';
import { user } from './User';
import { formatDate, getAverage } from './common functions/CommonFunctions';

class Softwares {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
    this.usersRef = database.collection('Users');
  }

  bindUpdaterToReview(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.id)
      .onSnapshot(doc => {
        cb();
      });
  }

  getSoftwares(cb) {
    const softwares = [];
    this.softwaresRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          softwares.push({ id: doc.id, ...doc.data() });
        });
        cb(softwares);
      })
      .catch(error => console.log('Error: ', error));
  }

  getReviews(softwareID, cb) {
    const reviews = [];
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().review !== '') {
            reviews.push({
              id: doc.id,
              ...doc.data(),
              date: formatDate(doc.data().date.toDate()),
            });
          }
        });
        cb(reviews);
      })
      .catch(error => console.log('Error: ', error));
  }

  getSoftware(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        cb({ ...doc.data(), id: doc.id });
      })
      .catch(error => console.log('Error: ', error));
  }

  writeRating(softwareID, data) {
    return this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.id)
      .set({ ...data, date: firebase.firestore.Timestamp.now() });
  }

  incrementTotalReviews(softwareID) {
    return this.softwaresRef.doc(softwareID).update({
      total_reviews: firebase.firestore.FieldValue.increment(1),
    });
  }

  decrementTotalReviews(softwareID) {
    return this.softwaresRef.doc(softwareID).update({
      total_reviews: firebase.firestore.FieldValue.increment(-1),
    });
  }

  updateStarCount(softwareID, starType, updateType) {
    return this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + starType]:
        updateType === 'INC'
          ? firebase.firestore.FieldValue.increment(1)
          : firebase.firestore.FieldValue.increment(-1),
    });
  }

  async replaceStarCount(softwareID, incrementStarType, decrementStarType) {
    await this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + incrementStarType]:
        firebase.firestore.FieldValue.increment(1),
    });
    return await this.softwaresRef.doc(softwareID).update({
      ['stars_count.' + decrementStarType]:
        firebase.firestore.FieldValue.increment(-1),
    });
  }

  updateAverageRating(softwareID) {
    return this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        return getAverage(doc.data().stars_count);
      })
      .then(averageRating => {
        return this.softwaresRef.doc(softwareID).update({
          average_rating: Number(averageRating.toFixed(1)),
        });
      });
  }
}

export const softwares = new Softwares();
