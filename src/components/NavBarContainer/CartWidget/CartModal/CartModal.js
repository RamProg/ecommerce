import React, { useContext } from 'react';
import './CartModal.css';
import { Context } from '../../../../context/CartContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

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

    function getKey(id, selectedOption = null) {
        let value = id
        if (selectedOption) value += selectedOption
        return value
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {cart.length ? <div>
                        <ul>
                            {cart.map(e =>
                                (e.item.id && e.quantity) &&
                                <li key={getKey(e.item.id, e.item.selectedOption)}>{e.item.title} {e.item.selectedOption && <span>| Variant: {e.item.selectedOption} |</span>} x {e.quantity}: $ {e.item.price}<span> </span>
                                    <button onClick={() => handleDelete(e.item.id, e.item.selectedOption)}>Eliminar elemento</button></li>)}
                        </ul>
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


