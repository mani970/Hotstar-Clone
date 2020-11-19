import firebase from 'firebase';

import "firebase/auth";//auth
import "firebase/database";//database can like sql, mongodb 
import "firebase/storage";//storage /// images, photos, pdf, fonts

const firebaseConfig = {
    apiKey: "AIzaSyDjt5xMm4MxjlGyUXNDq2uoPHhmK2WkSsU",
    authDomain: "hotstar-fd015.firebaseapp.com",
    databaseURL: "https://hotstar-fd015.firebaseio.com",
    projectId: "hotstar-fd015",
    storageBucket: "hotstar-fd015.appspot.com",
    messagingSenderId: "701505727564",
    appId: "1:701505727564:web:4f61e332afccaac996d8e9"
  };

  //initialize firebase and react application
  firebase.initializeApp(firebaseConfig);

  export default firebase;