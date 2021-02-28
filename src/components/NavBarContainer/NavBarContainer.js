import React, { useState, useEffect, useContext } from 'react'
import {NavBar} from './NavBar/NavBar'
import { getFirestore } from '../../firebase'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import { UserContext } from "../../context/UserContext";

export const NavBarContainer = () => {

    const firebase = useFirebaseApp();

    const [categories, setCategories] = useState([])
    const [showCartModal, setShowCartModal] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const { auth, setAuth } = useContext(UserContext);

    let currentUser = firebase.auth().currentUser;

    useEffect(() => { }, [currentUser])

    function handleShowCartModal() { setShowCartModal(true) }
    function handleCloseCartModal() { setShowCartModal(false) }

    function handleShowWishListModal() { setShowWishListModal(true) }
    function handleCloseWishListModal() { setShowWishListModal(false) }

    useEffect(() => {
        const db = getFirestore()
        const itemsCollection = db.collection("categories")
        itemsCollection.get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log("no hay categories")
                }
                setCategories(querySnapshot.docs.map(doc => {
                    return ({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                )
            }).catch(error => console.log("error searching categories ", error))
    }, [])

    function logout () {
        firebase.auth().signOut()
            .then(() => setAuth(false))
    }

    return (
        <NavBar categories={categories} currentUser={currentUser} handleShowCartModal={handleShowCartModal}
        handleShowWishListModal={handleShowWishListModal} showCartModal={showCartModal} 
        handleCloseCartModal={handleCloseCartModal} showWishListModal={showWishListModal} 
        handleCloseWishListModal={handleCloseWishListModal} auth={auth} setAuth={setAuth}
        logout={logout}
        />
    )
}