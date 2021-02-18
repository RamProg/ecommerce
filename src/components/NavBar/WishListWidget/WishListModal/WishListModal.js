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

    function handleDelete(id) {
        removeItemFromWishList(id)
    }

    function handleClear() {
        clear()
    }

    function handleMoveToCart(item, quantity) {
        addItem(item, quantity)
        removeItemFromWishList(item.id)
    }

    function totalPrice() {
        let price = 0
        wishList.forEach(e => price += e.item.price * e.quantity);
        return price
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
                                <li key={e.item.id}>{e.item.title} x {e.quantity}: $ {e.item.price}<span> </span>
                                    <button onClick={() => handleDelete(e.item.id)}>Eliminar elemento</button>
                                    <button onClick={() => handleMoveToCart(e.item, e.quantity)}>Mover a Cart</button>
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


