import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/cartContext'

export const Cart = () => {
    const [cart, addItem, removeItem, clear, isInCart] = useContext(CartContext)

    // useEffect(() => {
    // }, [cart])

    function handleDelete(id) {
        removeItem(id)
    }

    function handleClear() {
        clear()
    }

    return (
        <div>
            {console.log(cart)}
            <h1>This is cart</h1>
            {cart.length ? <div>
                <ul>
                    {cart.map(e =>
                        (e.item.id && e.quantity) &&
                        <li key={e.item.id}>{e.item.title} x {e.quantity}
                            <button onClick={() => handleDelete(e.item.id)}>Eliminar elemento</button></li>)}
                </ul>
                <button onClick={handleClear}>Vaciar carrito</button>
            </div>
                :
                <p>el cart esta vacio</p>
            }
        </div>
    )
}
