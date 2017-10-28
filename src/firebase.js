import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDFdByXmw7Vw5sgRb7MJfRY76zbySqfG0M",
  authDomain: "weather-3d72c.firebaseapp.com",
  databaseURL: "https://weather-3d72c.firebaseio.com",
  projectId: "weather-3d72c",
  storageBucket: "weather-3d72c.appspot.com",
  messagingSenderId: "303614294995"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
