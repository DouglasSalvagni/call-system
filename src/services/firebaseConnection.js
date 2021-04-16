import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCTDOu81l4x-ucMG7v1tEWCue8QlP-yLAc",
    authDomain: "sistema-estoque-d5cc4.firebaseapp.com",
    projectId: "sistema-estoque-d5cc4",
    storageBucket: "sistema-estoque-d5cc4.appspot.com",
    messagingSenderId: "194334998490",
    appId: "1:194334998490:web:14edc41bc45ad55962cae3",
    measurementId: "G-0T74C28QZ9"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;