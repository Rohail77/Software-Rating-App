import { database } from '../config/database_config';
import { formatDate } from '../utils/util-functions';
import { id } from './User';

export const softwaresRef = database.collection('Softwares');
export const usersRef = database.collection('Users');

export const userReviewRef = softwareId =>
  softwaresRef.doc(softwareId).collection('Reviews').doc(id());

export const userReview = softwareId => userReviewRef(softwareId).get();

export const softwareReviewsRef = softwareId =>
  softwaresRef.doc(softwareId).collection('Reviews');

export const formatReview = doc => ({
  id: doc.id,
  ...doc.data(),
  date: formatDate(doc.data().date.toDate()),
});

export const softwareRef = id => softwaresRef.doc(id);
export const software = id => softwareRef(id).get();
