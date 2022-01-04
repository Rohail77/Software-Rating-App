import firebase from 'firebase';
import { alertError, getAverage, isEmpty } from '../utils/util-functions';
import {
  formatReview,
  software,
  softwareRef,
  softwareReviewsRef,
  softwaresRef,
  userReviewRef,
} from './common';

export const getSoftwares = async () => {
  let softwares = [];
  try {
    const querySnapshot = await softwaresRef.get();
    querySnapshot.forEach(doc => softwares.push({ id: doc.id, ...doc.data() }));
    return softwares;
  } catch (error) {
    alertError();
  }
};

export const getReviews = async softwareId => {
  const reviews = [];
  try {
    const querySnapshot = await softwareReviewsRef(softwareId)
      .orderBy('date', 'desc')
      .get();

    querySnapshot.forEach(doc => {
      if (!isEmpty(doc.data().review)) reviews.push(formatReview(doc));
    });
    return reviews;
  } catch (error) {
    alertError();
  }
};

export const getSoftware = async Id => {
  try {
    const doc = await software(Id);
    return { ...doc.data(), id: doc.id };
  } catch (error) {
    alertError();
  }
};

export const writeRating = (softwareId, data) => {
  return userReviewRef(softwareId).set({
    ...data,
    date: firebase.firestore.Timestamp.now(),
  });
};

export const incrementTotalReviews = softwareId =>
  softwareRef(softwareId).update({
    total_reviews: firebase.firestore.FieldValue.increment(1),
  });

export const decrementTotalReviews = softwareId =>
  softwareRef(softwareId).update({
    total_reviews: firebase.firestore.FieldValue.increment(-1),
  });

export const updateStarCount = (softwareId, starType, updateType) => {
  return softwareRef(softwareId).update({
    ['stars_count.' + starType]:
      updateType === 'INC'
        ? firebase.firestore.FieldValue.increment(1)
        : firebase.firestore.FieldValue.increment(-1),
  });
};

export const replaceStarCount = async (
  softwareId,
  incrementStarType,
  decrementStarType
) => {
  await softwareRef(softwareId).update({
    ['stars_count.' + incrementStarType]:
      firebase.firestore.FieldValue.increment(1),
  });
  return await softwareRef(softwareId).update({
    ['stars_count.' + decrementStarType]:
      firebase.firestore.FieldValue.increment(-1),
  });
};

export const updateAverageRating = async softwareId => {
  const doc = await software(softwareId);
  const averageRating = getAverage(doc.data().stars_count);
  return await softwareRef(softwareId).update({
    average_rating: Number(averageRating.toFixed(1)),
  });
};
