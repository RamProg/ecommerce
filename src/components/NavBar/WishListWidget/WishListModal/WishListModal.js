import React, { useContext } from 'react';
// import './CartModal.css';
import { WLContext } from '../../../../context/WishListContext'
import { Context } from '../../../../context/CartContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export const WishListModal = ({ show, handleClose }) => {
    const { wishList, removeItemFromWishList, clear } = useContext(WLContext)
    const { addItem } = useContext(Context)

    function handleDelete(id, selectedOption = null) {
        removeItemFromWishList(id, selectedOption)
    }

    function handleClear() {
        clear()
    }

    function handleMoveToCart(item, quantity, selectedOption) {
        addItem(item, quantity)
        removeItemFromWishList(item.id, selectedOption)
    }

    function totalPrice() {
        let price = 0
        wishList.forEach(e => price += e.item.price * e.quantity);
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
                <Modal.Title>WishList Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {wishList.length ? <div>
                        <ul>
                            {wishList.map(e =>
                                (e.item.id && e.quantity) &&
                                <li key={getKey(e.item.id, e.item.selectedOption)}>{e.item.title} {e.item.selectedOption && <span>| Variant: {e.item.selectedOption} |</span>} x {e.quantity}: $ {e.item.price}<span> </span>
                                    <button onClick={() => handleDelete(e.item.id, e.item.selectedOption)}>Eliminar elemento</button>
                                    <button onClick={() => handleMoveToCart(e.item, e.quantity, e.item.selectedOption)}>Mover a Cart</button>
                                </li>)}
                        </ul>
                        <span>Precio total: $ {totalPrice()} </span>
                        <button onClick={handleClear}>Vaciar WishList</button><br />
                        <br />
                    </div>
                        :

                        <p>La wishList esta vacia</p>
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


