import React, { useState, useContext } from 'react'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import { UserContext } from "../../context/UserContext";
import { Redirect } from 'react-router-dom'

export const SignupContainer = () => {
    const firebase = useFirebaseApp();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const { auth, setAuth } = useContext(UserContext);
    var currentUser = firebase.auth().currentUser;

    const submit = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: name,
                }).then(function () {
                    console.log("nombre es", firebase.auth().currentUser.displayName)
                    setAuth(true)
                }).catch(function (error) {
                    console.log("an error happened setting the name", error.code, error.message)
                });
            })
            .catch((error) => {
                alert(error.code, error.message)
            });
    }



    const logout = async () => {
        console.log("loging out ")
        await firebase.auth().signOut()
        setAuth(false)
    }

    return (
        <div className="container mt-5">
            {auth ?
                <Redirect to={{ pathname: '/' }} />
                :
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={e => setName(e.target.value)} type="name" id="name" /><br />
                    <label htmlFor="email">Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" id="email" /><br />
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" id="password" /><br />
                    <button onClick={submit}>Signup</button>
                </div>
            }
        </div>
    )
}