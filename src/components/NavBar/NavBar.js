import React from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { CartWidget } from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'

export const NavBar = () => {


    const categories = [
        { id: 1, name: "Spaceships" },
        { id: 2, name: "Weapons" },
        { id: 3, name: "Fuel and Others" }]

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Cosmic Ecommerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {categories.map(cat => {
                            return <NavDropdown.Item as={Link} key={cat.id} to={`/categories/${cat.id}`}>{cat.name}</NavDropdown.Item>
                        }
                        )}
                    </NavDropdown>
                    <NavDropdown title="Cart" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">See Cart</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Pay Cart</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Empty Cart</NavDropdown.Item>
                    </NavDropdown>
                    <CartWidget />
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}