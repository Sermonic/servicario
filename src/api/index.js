import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../db'

// ---------- SERVICES ----------
export const fetchServiceById = (serviceId) => {
  return db
    .collection('services')
    .doc(serviceId)
    .get()
    .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }))
}

export const fetchServices = () => {
  return db
    .collection('services')
    .get()
    .then((snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return services
    })
}
// ---------- SERVICES END ----------

// ---------- AUTH ----------
export const register = async ({ email, password, fullName, avatar }) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    const { user } = response

    return true
  } catch (error) {
    return Promise.reject(error.message)
  }
}
