import { database } from '../config/database_config';
import firebase from 'firebase';
import { user } from './User';
import { formatDate, isEmpty } from './common functions/CommonFunctions';

import { getAverage } from '../utils/util-functions';

class Softwares {
  constructor() {
    this.softwaresRef = database.collection('Softwares');
    this.usersRef = database.collection('Users');
  }

  bindUpdaterToReview(softwareID, cb) {
    const unsubscribe = this.softwaresRef
      .doc(softwareID)
      .collection('Reviews')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('Added: ', change.doc.data());
            cb(this.getFormattedReview(change.doc));
          }
          if (change.type === 'modified') {
            console.log('Modified: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed: ', change.doc.data());
          }
        });
      });
    return unsubscribe;
    // const unsubscribe = this.softwaresRef
    //   .doc(softwareID)
    //   .collection('Reviews')
    //   .doc(user.id)
    //   .onSnapshot(doc => {
    //     if (doc.data()) cb(this.getFormattedReview(doc));
    //   });
    // return unsubscribe;
  }

  async myReview(softwareId) {
    const doc = await this.softwaresRef
      .doc(softwareId)
      .collection('Reviews')
      .doc(user.id)
      .get();
    return this.getFormattedReview(doc);
  }

  getFormattedReview(doc) {
    return {
      id: doc.id,
      ...doc.data(),
      date: formatDate(doc.data().date.toDate()),
    };
  }

  async getSoftwares() {
    let softwares = [];
    try {
      const querySnapshot = await this.softwaresRef.get();
      querySnapshot.forEach(doc =>
        softwares.push({ id: doc.id, ...doc.data() })
      );

      // softwares = await Promise.all(
      //   softwares.map(async software => {
      //     const reviews = await this.getReviews(software.id);
      //     return {
      //       ...software,
      //       reviews,
      //     };
      //   })
      // );

      return softwares;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getReviews(softwareID) {
    const reviews = [];
    try {
      const querySnapshot = await this.softwaresRef
        .doc(softwareID)
        .collection('Reviews')
        .orderBy('date', 'desc')
        .get();

      querySnapshot.forEach(doc => {
        if (!isEmpty(doc.data().review))
          reviews.push(this.getFormattedReview(doc));
      });
      return reviews;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getSoftware(softwareID) {
    try {
      const doc = await this.softwaresRef.doc(softwareID).get();
      return { ...doc.data(), id: doc.id };
    } catch (error) {
      console.log('Error: ', error);
    }
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

  async updateAverageRating(softwareID) {
    const doc = await this.softwaresRef.doc(softwareID).get();
    const averageRating = getAverage(doc.data().stars_count);
    return await this.softwaresRef.doc(softwareID).update({
      average_rating: Number(averageRating.toFixed(1)),
    });
  }
}

export const softwares = new Softwares();
