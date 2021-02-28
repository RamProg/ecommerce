import React, { useContext } from 'react'
import { Context } from '../../../context/CartContext'
import { Link } from 'react-router-dom'
import './Cart.css'
import { OrderDisplay } from './OrderDisplay/OrderDisplay'

export const Cart = ({ handleDelete, handleClear, totalPrice }) => {
    const { cart } = useContext(Context)

    return (
        <div className="container cart">
            <h1>This is cart</h1>
            {cart.length ? <div>
                <ul>
                    <OrderDisplay order={cart} handleDelete={handleDelete} />
                </ul>
                <p>Precio total: $ {totalPrice()}</p>
                <button onClick={handleClear}>Vaciar carrito</button><br />
                <br />
                <Link to="/checkout"><button>Proceed to Checkout</button></Link>

            </div>
                :

                <p>el cart esta vacio<br />
                    <Link to="/">Volver al Inicio</Link></p>
            }
        </div>
    )
}