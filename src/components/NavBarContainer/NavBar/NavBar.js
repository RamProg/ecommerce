import React from 'react'
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { CartWidget } from '../CartWidget/CartWidget'
import { WishListWidget } from '../WishListWidget/WishListWidget'
import { Link } from 'react-router-dom'
import { CartModal } from '../CartWidget/CartModal/CartModal'
import { WishListModal } from '../WishListWidget/WishListModal/WishListModal'
import 'firebase/auth'

export const NavBar = ({ categories, currentUser, handleShowCartModal, handleShowWishListModal, showCartModal,
    handleCloseCartModal, showWishListModal, handleCloseWishListModal, auth, logout }) => {

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
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

                    </Nav>

                    {
                        auth ?
                            <>
                                <Nav className="greeting">Hi, {currentUser.displayName}</Nav>
                                <Link className="mr-5" onClick={logout} to="/">Logout</Link>
                                <span id="modal" onClick={handleShowCartModal}><CartWidget /></span>
                                <span id="modal" onClick={handleShowWishListModal}><WishListWidget /></span>
                                <CartModal show={showCartModal} handleClose={handleCloseCartModal} />
                                <WishListModal show={showWishListModal} handleClose={handleCloseWishListModal} />
                            </>
                            :
                            <><Link className="mr-5" to="/login">Login</Link>
                                <Link className="mr-5" to="/Signup">Signup</Link></>
                    }
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}