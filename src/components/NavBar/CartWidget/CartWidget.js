import React, { useContext } from 'react';
import './CartWidget.css';
import { CartContext } from '../../../context/cartContext'

export const CartWidget = () => {
    const { cart } = useContext(CartContext)

    function ammountOfItems() {
        let counter = 0
        cart.forEach(e => {
            counter += e.quantity
        });
        console.log('contador' + counter)
        return counter
    }
    return (

        <div>
            <img id="cart" className="mt-2" src="/img/cart.png" alt="cart"></img>
            {ammountOfItems()}
        </div>

    )
}