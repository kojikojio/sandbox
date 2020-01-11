import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdJzFhZaJti6jY8FRWoSH5u7iSF9I0qKI",
  authDomain: "sandbox-5d106.firebaseapp.com",
  databaseURL: "https://sandbox-5d106.firebaseio.com",
  projectId: "sandbox-5d106",
  storageBucket: "sandbox-5d106.appspot.com",
  messagingSenderId: "631189054380",
  appId: "1:631189054380:web:35cbc6171d5200fe4dd009"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp);

export default firebase;
