import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAAL2vMrnemHFy-AJCxUMp1O2Rtv9E_8D4',
  authDomain: 'my-holiday-proje-1616778972307.firebaseapp.com',
  projectId: 'my-holiday-proje-1616778972307',
  storageBucket: 'my-holiday-proje-1616778972307.appspot.com',
  messagingSenderId: '1055469780819',
  appId: '1:1055469780819:web:9cecb9a29babeadf1caba6',
  measurementId: 'G-K8TPK4W4H3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();





