import React, { useState, useContext } from 'react'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import { UserContext } from "../../context/UserContext";
import {Redirect} from 'react-router-dom'


export const LoginContainer = () => {
    const firebase = useFirebaseApp();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { auth, setAuth } = useContext(UserContext);

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => setAuth(true)
            )
            .catch((error) => alert(error.code, error.message))
    }

    return (
        <div className="container mt-5">
            {auth ?
                <Redirect to={{ pathname: '/' }} />
                :
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" id="email" /><br />
                    <label htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" id="password" /><br />
                    <button onClick={login}>Login</button>

                    <p>Test Mail: test@test.com</p>
                    <p>Test Password: testtest</p>
                </div>
            }
        </div>
    )
}