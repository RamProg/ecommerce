import firebase from 'firebase/app'
import '@firebase/firestore'

const APIKEY = process.env.REACT_APP_FIREBASE_APIKEY

const app = firebase.initializeApp({
    apiKey: APIKEY,
    authDomain: "ramacode-ecommerce.firebaseapp.com",
    projectId: "ramacode-ecommerce",
    storageBucket: "ramacode-ecommerce.appspot.com",
    messagingSenderId: "1096125481719",
    appId: "1:1096125481719:web:124fb11012f93b766d49f2"
})

export function getFirebase() {
    return app
}

export function getFirestore() {
    return firebase.firestore(app)
}