import { database } from '../config/database_config';
import firebase from 'firebase';
import { user } from './User';
import { formatDate } from './common functions/CommonFunctions';

class Database {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
    this.usersRef = database.collection('Users');
  }

  onSoftwareUpdate(cb) {
    this.handleSoftwareUpdate = cb;
  }

  bindUpdaterToSoftware(softwareID) {
    this.softwaresRef.doc(softwareID).onSnapshot(doc => {
      this.handleSoftwareUpdate({ id: doc.id, ...doc.data() });
    });
  }

  bindUpdaterToReview(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.email)
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
          // this.bindUpdaterToSoftware(doc.id);
          softwares.push({ id: doc.id, ...doc.data() });
        });
        cb(softwares);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  addSoftwares(softwares) {
    softwares.forEach(software => {
      database.collection('Softwares').add(software);
    });
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
              ...doc.data(),
              date: formatDate(doc.data().date.toDate()),
            });
          }
        });
        cb(reviews);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  getSoftware(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        cb({ ...doc.data(), id: doc.id });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  writeRating(softwareID, data, cb) {
    this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .doc(user.email)
      .set({ ...data, date: firebase.firestore.Timestamp.now() })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }

  incrementTotalReviews(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .update({
        total_reviews: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }

  decrementTotalReviews(softwareID, cb) {
    this.softwaresRef
      .doc(softwareID)
      .update({
        total_reviews: firebase.firestore.FieldValue.increment(-1),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }

  updateStarCount(softwareID, starType, updateType, cb) {
    this.softwaresRef
      .doc(softwareID)
      .update({
        ['stars_count.' + starType]:
          updateType === 'INC'
            ? firebase.firestore.FieldValue.increment(1)
            : firebase.firestore.FieldValue.increment(-1),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }

  replaceStarCount(softwareID, incrementStarType, decrementStarType, cb) {
    this.softwaresRef
      .doc(softwareID)
      .update({
        ['stars_count.' + incrementStarType]:
          firebase.firestore.FieldValue.increment(1),
        ['stars_count.' + decrementStarType]:
          firebase.firestore.FieldValue.increment(-1),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }

  updateAverageRating(softwareID, cb = null) {
    this.softwaresRef
      .doc(softwareID)
      .get()
      .then(doc => {
        const stars_count = doc.data().stars_count;
        let numerator = 0;
        let denominator = 0;
        Object.keys(stars_count).forEach(star => {
          numerator += Number.parseInt(star) * stars_count[star];
          denominator += stars_count[star];
        });
        const averageRating = denominator === 0 ? 0 : numerator / denominator;
        this.updateAverageRatingHelper(softwareID, averageRating, cb);
      })
      .catch(error => console.log(error));
  }

  updateAverageRatingHelper(softwareID, averageRating, cb = null) {
    this.softwaresRef
      .doc(softwareID)
      .update({
        average_rating: Number(averageRating.toFixed(1)),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log(error));
  }
}

export const db = new Database();
