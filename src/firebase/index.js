import firebase from 'firebase/app'
import '@firebase/firestore'

const APIKEY = process.env.REACT_APP_FIREBASE_APIKEY
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECTID
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGEBUCKET
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID
const APP_ID = process.env.REACT_APP_FIREBASE_APPID

export const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}

const app = firebase.initializeApp(firebaseConfig)

export function getFirebase() {
    return app
}

export function getFirestore() {
    return firebase.firestore(app)
}