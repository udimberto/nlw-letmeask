import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebase.auth()
const firebaseDatabase = firebase.database()

function firebaseRef(path: string) {
  return firebaseDatabase.ref(path)
}

function getUser() {
  return firebaseAuth.currentUser
}

export {
  firebase,
  firebaseAuth,
  firebaseDatabase,
  firebaseRef,
  getUser,
}
