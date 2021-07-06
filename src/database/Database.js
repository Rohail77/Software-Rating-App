import { database } from '../config/database_config';
import firebase from 'firebase';
import { reviews } from './data/reviews';

class Database {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
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
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  addRating(softwareID, data, cb) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .collection('Reviews')
      .doc(`${data.username}`)
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
        this.updateAverageRating(softwareID, cb);
      });
  }

  updateAverageRating(softwareID, cb) {
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
        this.updateAverageRatingHelper(softwareID, averageRating, cb);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  updateAverageRatingHelper(softwareID, averageRating, cb) {
    this.softwaresRef
      .doc(`${softwareID}`)
      .update({
        average_rating: Number(averageRating.toFixed(1)),
      })
      .then(() => {
        cb();
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
          if(doc.data().review !== '') {
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
//   },
//   {
//     name: 'Skype',
//     developer: 'Microsoft',
//     average_rating: 0,
//     description:
//       'Skype is a proprietary telecommunications application that specializes in providing VoIP-based videotelephony, videoconferencing and voice calls. It also has instant messaging, file transfer, debit-based calls to landline and mobile telephones, and other features.',
//     stars_count: {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 0,
//       5: 0,
//     },
//     total_reviews: 0,
//   },
//   {
//     name: 'Visual Studio Code',
//     developer: 'Microsoft',
//     average_rating: 0,
//     description:
//       'Visual Studio Code is a source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git.',
//     stars_count: {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 0,
//       5: 0,
//     },
//     total_reviews: 0,
//   },
//   {
//     name: 'Figma',
//     developer: 'Figma, Inc',
//     average_rating: 0,
//     description:
//       'Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows. The Figma Mirror companion apps for Android and iOS allow viewing Figma prototypes in real-time on mobile devices.',
//     stars_count: {
//       1: 0,
//       2: 0,
//       3: 0,
//       4: 0,
//       5: 0,
//     },
//     total_reviews: 0,
//   },
// ];
