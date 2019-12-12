import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBbHM6b8WUoC3rGbKLT5CW5IjBd9GDso6A",
  authDomain: "collegesharing-64d7f.firebaseapp.com",
  databaseURL: "https://collegesharing-64d7f.firebaseio.com",
  projectId: "collegesharing-64d7f",
  storageBucket: "collegesharing-64d7f.appspot.com",
  messagingSenderId: "756186706514",
  appId: "1:756186706514:web:5bcebc7f6e619c6229e58b",
  measurementId: "G-5BE2J4YLVE"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  timestampsInSnapshots: true
})

const storage = firebase.storage();
const fireStore = firebase.firestore()

export { 
    storage, fireStore, firebase as default 
};
