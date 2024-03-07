import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDOVbW2WeufDqvG9KMe5pkellQf8JR_qLk",
    authDomain: "yesurise-web.firebaseapp.com",
    projectId: "yesurise-web",
    storageBucket: "yesurise-web.appspot.com",
    messagingSenderId: "1041544961328",
    appId: "1:1041544961328:web:b9e20a5b9b97f66172fcf5",
    measurementId: "G-Z3K818C2PV"
  };

  firebase.initializeApp(firebaseConfig);
  

  export default firebase;