// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore';

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCxVkyDV2XCQM9Uo2tZhrCnmHtnfurOX_Y",
    authDomain: "app-mobilite-test.firebaseapp.com",
    databaseURL: "https://app-mobilite-test-default-rtdb.firebaseio.com",
    projectId: "app-mobilite-test",
    storageBucket: "app-mobilite-test.appspot.com",
    messagingSenderId: "417546564734",
    appId: "1:417546564734:web:d1826e669c1e013035542f",
    measurementId: "G-PZJJTNB44C"
  })
  .firestore()

export const fire = firebase

// Get a reference to the storage service, which is used to create references in your storage bucket
export var storage = firebase.storage()

// Create a storage reference from our storage service
export var storageRef = storage.ref()
