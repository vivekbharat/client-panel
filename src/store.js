import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Reducers
//@todo
const firebaseConfig = {
  apiKey: "AIzaSyBjFa69-Ae3f21c88QiP3pc9LRlS-N7zpY",
  authDomain: "react-client-panel-48447.firebaseapp.com",
  databaseURL: "https://react-client-panel-48447.firebaseio.com",
  projectId: "react-client-panel-48447",
  storageBucket: "react-client-panel-48447.appspot.com",
  messagingSenderId: "689531298026"
};

//React Redux Firebase config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true
};

//Initialize Firebase instance
firebase.initializeApp(firebaseConfig);

//Initialize fire store
const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

const initialState = {};

//Create Store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
