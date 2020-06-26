import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyBLvvLhjXILqZjWU8vm3sXSNlIdwwsRbKI',
    authDomain: 'servicario-e0b50.firebaseapp.com',
    databaseURL: 'https://servicario-e0b50.firebaseio.com',
    projectId: 'servicario-e0b50',
    storageBucket: 'servicario-e0b50.appspot.com',
    messagingSenderId: '109612236933',
    appId: '1:109612236933:web:09a02fc1c59396128829ec',
    measurementId: 'G-RQGEM7T0C6',
  })
  .firestore()

export default db

export const { Timestamp } = firebase.firestore
