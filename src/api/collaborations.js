import firebase from 'firebase/app'
import db from '../db'
import { createRef } from './index'

export const createCollaboration = (collab) =>
  db
    .collection('collaborations')
    .add(collab)
    .then((docRef) => docRef.id)

export const sendMessage = (message) =>
  db
    .collection('profiles')
    .doc(message.toUser)
    .collection('messages')
    .add(message)

export const subscribeToMessages = (userId, callback) => {
  return db
    .collection('profiles')
    .doc(userId)
    .collection('messages')
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(messages)
    })
}

export const markMessageAsRead = (message) =>
  db
    .collection('profiles')
    .doc(message.toUser)
    .collection('messages')
    .doc(message.id)
    .update({ isRead: true })

export const fetchCollaborations = (userId) =>
  db
    .collection('collaborations')
    .where('allowedPeople', 'array-contains', userId)
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    )

export const subToCollaboration = (collaborationId, callback) =>
  db
    .collection('collaborations')
    .doc(collaborationId)
    .onSnapshot((snapshot) => {
      const collaboration = { id: snapshot.id, ...snapshot.data() }

      callback(collaboration)
    })

export const joinCollaboration = (collaborationId, uid) => {
  const userRef = createRef('profiles', uid)

  return db
    .collection('collaborations')
    .doc(collaborationId)
    .update({ joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef) })
}
