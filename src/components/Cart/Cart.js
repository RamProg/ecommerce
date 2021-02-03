import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import {Link} from 'react-router-dom'
import './Cart.css'

export const Cart = () => {
    const [cart, addItem, removeItem, clear, isInCart] = useContext(CartContext)

    function handleDelete(id) {
        removeItem(id)
    }

    function handleClear() {
        clear()
    }

    function totalPrice () {
        let price = 0
        cart.forEach(e => price += e.item.price * e.quantity);
        return price
    }

    return (
        <div class="container cart">
            {console.log(cart)}
            <h1>This is cart</h1>
            {cart.length ? <div>
                <ul>
                    {cart.map(e =>
                        (e.item.id && e.quantity) &&
                        <li key={e.item.id}>{e.item.title} x {e.quantity}
                            <button onClick={() => handleDelete(e.item.id)}>Eliminar elemento</button></li>)}
                </ul>
                <p>Precio total: $ {totalPrice()}</p>
                <button onClick={handleClear}>Vaciar carrito</button><button>Finalizar la compra</button>
            </div>
                :

                <p>el cart esta vacio<br/>
                <Link to="/">Volver al Inicio</Link></p>
            }
        </div>
    )
}
