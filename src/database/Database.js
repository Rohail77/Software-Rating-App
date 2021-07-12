import { database } from '../config/database_config';
import firebase from 'firebase';
import { reviews } from './data/reviews';
import { user } from '../database/User';

class Database {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
    this.usersRef = database.collection('Users');
  }

  setUserReference(userEmail) {
    this.userRef = database.collection('Users').doc(`${userEmail}`);
  }

  onSoftwareUpdate(cb) {
    this.handleSoftwareUpdate = cb;
  }

  onRatingWrite(cb) {
    this.handleRatingWrite = cb;
  }

  bindUpdaterToSoftware(softwareID) {
    this.softwaresRef.doc(`${softwareID}`).onSnapshot(doc => {
      this.handleSoftwareUpdate({ id: doc.id, ...doc.data() });
    });
  }

  bindUpdaterToReviews(softwareID) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .collection('Reviews')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log('Updated Reviews for Software: ', doc.data());
        });
      });
  }

  bindUpdaterToReview(softwareID, username) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .collection('Reviews')
      .doc(`${username}`)
      .onSnapshot(doc => {
        console.log('Updated User Review: ', doc.data());
      });
  }

  getSoftwares(cb) {
    const softwares = [];
    this.softwaresRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.bindUpdaterToReviews(doc.id);
          this.bindUpdaterToSoftware(doc.id);
          softwares.push({ id: doc.id, ...doc.data() });
        });
        cb(softwares);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  writeRating(softwareID, data) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .collection('Reviews')
      .doc(`${user.email}`)
      .set({ ...data, date: firebase.firestore.Timestamp.now() });
    this.softwaresRef.doc(`${softwareID}`).update({
      total_reviews:
        data.review === ''
          ? firebase.firestore.FieldValue.increment(0)
          : firebase.firestore.FieldValue.increment(1),
    });
    this.softwaresRef
      .doc(`${softwareID}`)
      .update({
        ['stars_count.' + data.rating]:
          firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        this.updateAverageRating(softwareID);
      });
  }

  updateAverageRating(softwareID) {
    this.softwaresRef
      .doc(`${softwareID}`)
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
        this.updateAverageRatingHelper(softwareID, averageRating);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  updateAverageRatingHelper(softwareID, averageRating) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .update({
        average_rating: Number(averageRating.toFixed(1)),
      })
      .then(() => {
        this.handleRatingWrite();
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
    reviews.length = 0;
    this.softwaresRef
      .doc(`${softwareID}`)
      .collection('Reviews')
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().review !== '') {
            const date = new Intl.DateTimeFormat('en-US').format(
              doc.data().date.toDate()
            );
            reviews.push({ ...doc.data(), date });
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
      .doc(`${softwareID}`)
      .get()
      .then(doc => {
        cb({ ...doc.data(), id: doc.id });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }
}

export const db = new Database();

// const softwares = [
//   {
//     name: 'Firefox',
//     developer: 'Mozilla',
//     average_rating: 0,
//     description:
//       'Firefox Browser, also known as Mozilla Firefox or simply Firefox, is a free and open-source web browser developed by the Mozilla Foundation and its subsidiary, the Mozilla Corporation. Firefox uses the Gecko rendering engine to display web pages.',
//     stars_count: {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 0,
//       5: 0,
//     },
//     total_reviews: 0,
//   }
// ];
