import React, { useContext } from 'react';
import './CartModal.css';
import { Context } from '../../../../context/CartContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { OrderDisplay } from '../../../CartContainer/Cart/OrderDisplay/OrderDisplay'

export const CartModal = ({ show, handleClose }) => {
    const { cart, removeItem, clear } = useContext(Context)
    function handleDelete(id, selectedOption = null) {
        removeItem(id, selectedOption)
    }

    function handleClear() {
        clear()
    }

    function totalPrice() {
        let price = 0
        cart.forEach(e => price += e.item.price * e.quantity);
        return price
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {cart.length ? <div>
                        <OrderDisplay order={cart} handleDelete={handleDelete} />
                        <span>Precio total: $ {totalPrice()} </span>
                        <button onClick={handleClear}>Vaciar carrito</button><br />
                        <br />
                    </div>
                        :

                        <p>el cart esta vacio</p>
                    }
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Link to={'/cart'}><Button variant="primary" onClick={handleClose}>
                    Go to Cart
          </Button></Link>
            </Modal.Footer>
        </Modal>
    )
}


