import React, { useContext, useState } from 'react'
import { CartContext } from '../../../context/cartContext'
import { Link } from 'react-router-dom'
import './Cart.css'
import Alert from 'react-bootstrap/Alert';

export const Cart = ({ handleDelete, handleClear, totalPrice, createOrder, updateName,
    updatePhone, updateMail, orderNumber, ableFinish }) => {
    const { cart } = useContext(CartContext)
    return (
        <div class="container cart">
            <h1>This is cart</h1>
            {cart.length ? <div>
                <ul>
                    {cart.map(e =>
                        (e.item.id && e.quantity) &&
                        <li key={e.item.id}>{e.item.title} x {e.quantity}: $ {e.item.price}<span> </span>
                            <button onClick={() => handleDelete(e.item.id)}>Eliminar elemento</button></li>)}
                </ul>
                <p>Precio total: $ {totalPrice()}</p>
                <button onClick={handleClear}>Vaciar carrito</button><br />
                <br />
                <form>
                    <label for="name">Name:
                    <input type="text" onChange={e => updateName(e.target.value)} id="name"></input></label><br />
                    <label for="phone">Phone:
                    <input type="text" onChange={e => updatePhone(e.target.value)} id="phone"></input></label><br />
                    <label for="email">Email:
                    <input type="text" onChange={e => updateMail(e.target.value)} id="email"></input></label><br />
                    <input type="submit" disabled={ableFinish} onClick={createOrder} value="Realizar compra" />
                </form>
                <br />
                {orderNumber === 'loading' &&
                    <Alert variant="dark">
                        Tu orden está siendo creada, aguarda por favor.
                    </Alert>}
                {(orderNumber && orderNumber !== 'loading') &&
                    <Alert variant="success">
                        Tu orden se ha creado: {orderNumber}
                    </Alert>
                }
            </div>
                :

                <p>el cart esta vacio<br />
                    <Link to="/">Volver al Inicio</Link></p>
            }
        </div>
    )
}