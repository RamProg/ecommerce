import React, { useContext, useState, useEffect } from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { CartWidget } from './CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import { getFirestore } from '../../firebase'

export const NavBar = () => {

    const { cart } = useContext(CartContext)
    const [categories, setCategories] = useState([])
    // const categories = [
    //     { id: 'PsTsXMr7koVsUDRRwUBr', name: "Spaceships" },
    //     { id: 'r4C4zVdVshHYQfDWFJC3', name: "Weapons" },
    //     { id: 'rqZTILQufJ4rPko5t4vh', name: "Fuel and Others" }]

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
                    {cart.length ?
                        <Link to={'/cart'}><CartWidget /></Link>
                        :
                        <></>
                    }
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}