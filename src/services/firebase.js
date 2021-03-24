// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore';

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCoYwvEpKfdFZj4o4JeAAihEyn6pkGV5UM",
    authDomain: "tapitap-2be8c.firebaseapp.com",
    projectId: "tapitap-2be8c",
    storageBucket: "tapitap-2be8c.appspot.com",
    messagingSenderId: "317833644838",
    appId: "1:317833644838:web:3fb47d34482015e8d3cfe7",
    measurementId: "G-0E3YQMG1LB"
  })
  .firestore()

export const fire = firebase

// Get a reference to the storage service, which is used to create references in your storage bucket
export var storage = firebase.storage()

// Create a storage reference from our storage service
export var storageRef = storage.ref()
