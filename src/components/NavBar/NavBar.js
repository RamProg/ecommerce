import React, { useState, useEffect, useContext } from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { CartWidget } from './CartWidget/CartWidget'
import {WishListWidget} from './WishListWidget/WishListWidget'
import { Link } from 'react-router-dom'
import { getFirestore } from '../../firebase'
import { CartModal } from './CartWidget/CartModal/CartModal'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import { UserContext } from "../../context/UserContext";
import { useHistory } from 'react-router-dom'

export const NavBar = () => {

    const firebase = useFirebaseApp();

    const [categories, setCategories] = useState([])
    const [show, setShow] = useState(false);
    const { auth, setAuth } = useContext(UserContext);
    const history = useHistory();

    let currentUser = firebase.auth().currentUser;

    useEffect(() => { }, [currentUser])

    function handleShow() { setShow(true) }
    function handleClose() { setShow(false) }

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

    return (
        <React.Fragment>

            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">Cosmic Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ">
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {categories.map(cat => {
                                return <NavDropdown.Item as={Link} key={cat.key} to={`/categories/${cat.key}`}>{cat.key.charAt(0).toUpperCase() + cat.key.slice(1)}</NavDropdown.Item>
                            }
                            )}
                        </NavDropdown>

                    </Nav>

                    {
                        auth ?
                            <>
                                <Nav class="greeting">Hi, {currentUser.displayName}</Nav>
                                <Link class="mr-5" onClick={() => setAuth(false)} to="/">Logout</Link>
                                <Link onClick={handleShow}><CartWidget /></Link>
                                <Link onClick={handleShow}><WishListWidget /></Link>
                                <CartModal show={show} handleShow={handleShow} handleClose={handleClose} />
                            </>
                            :
                            <><Link className="mr-5" to="/login">Login</Link>
                                <Link className="mr-5" to="/Signup">Signup</Link></>
                    }



                </Navbar.Collapse>
            </Navbar>

}
        </React.Fragment>
    )
}