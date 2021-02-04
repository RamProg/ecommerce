import firebase from 'firebase/app'
import '@firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyD0tuyFhPw2CT5zAKp0XuXGT1_SQ9698uQ",
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