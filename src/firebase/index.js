import firebase from 'firebase'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9x0jp6KdAvwiOOLrXXYko0-0AvT27Svg",
    authDomain: "carservice-a99d2.firebaseapp.com",
    projectId: "carservice-a99d2",
    storageBucket: "carservice-a99d2.appspot.com",
    messagingSenderId: "367638644966",
    appId: "1:367638644966:web:b489a03dcce6cf694fd327",
    measurementId: "G-TW5HC4WNBT"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};

  