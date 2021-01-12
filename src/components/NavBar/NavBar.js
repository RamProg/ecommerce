import React from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { CartWidget } from '../CartWidget/CartWidget'

export const NavBar = () => {

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Cosmic Ecommerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Spaceships</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Weapons</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Fuel and others</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Cart" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">See Cart</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Pay Cart</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Empty Cart</NavDropdown.Item>
                   </NavDropdown>
                   <CartWidget/>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}