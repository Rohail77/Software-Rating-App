import { database } from '../config/database_config';
import { reviews } from './data/reviews';

class Software {
  constructor(softwareID) {
    this.softwareID = softwareID;
    this.sofwareRef = database
      .collection('Softwares')
      .doc(`${this.softwareID}`);
  }

  bindUpdaterToSoftware() {
    this.softwareRef.onSnapshot(doc => {
      console.log('Updated Software: ', doc.data());
    });
  }

  bindUpdaterToReviews() {
    this.softwareRef.collection('Reviews').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log('Updated Reviews for Software: ', doc.data());
      });
    });
  }

  getReviews(cb) {
    reviews.length = 0;
    this.softwareRef
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

  getSoftware(cb) {
    this.softwareRef
      .get()
      .then(doc => {
        cb({ ...doc.data(), id: doc.id });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }
}

const software = new Software('0KP0Ue4kr6NIHGgAJobS');
