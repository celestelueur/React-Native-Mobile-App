

import firebase from 'firebase/compat/app'
//import firebase from "@firebase/app-compat"
//import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth'
import "firebase/compat/database"
//import 'firebase/auth'
import 'firebase/compat/firestore'

//import 'firebase/firestore'
//import 'firebase/storage'
//import '@firebase/firestore-compat'
import 'firebase/compat/storage'
import {initializeFirestore} from 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: "AIzaSyBSGOrn_sB8rn8mnMRovtXJHb_YQvLFqAw",
  authDomain: "appstore-220d9.firebaseapp.com",
  databaseURL: "https://appstore-220d9-default-rtdb.firebaseio.com",
  projectId: "appstore-220d9",
  storageBucket: "appstore-220d9.appspot.com",
  messagingSenderId: "754186900493",
  appId: "1:754186900493:web:1f498d7c35d77f56c83144",
  measurementId: "G-MM8N0T6TEG"
  */
  apiKey: "AIzaSyAoBdOs1W41EB1aCAqAfzNKZc9PkAWB68A",
  authDomain: "appstore-c322d.firebaseapp.com",
  projectId: "appstore-c322d",
  storageBucket: "appstore-c322d.appspot.com",
  messagingSenderId: "179559538876",
  appId: "1:179559538876:web:d7a59b7d53f405cdc870b9",
  measurementId: "G-2Y2PJZYWS6"
};

const fb=firebase.initializeApp(firebaseConfig)

if(!firebase.apps.length){
  
  firebase.firestore().settings({
    experimentalAutoDetectLongPolling: true,
   // experimentalForceLongPolling:true
  })
}
const db=fb.database().ref()
//const auth=getAuth(firebaseConfig)

export {firebase, db}
