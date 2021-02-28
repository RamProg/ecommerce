import React, { useContext } from 'react'
import { Context } from '../../context/CartContext'
import '@firebase/firestore'
import { Cart } from './Cart/Cart'
import { Redirect } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import 'firebase/auth'

export const CartContainer = () => {
    const { cart, removeItem, clear } = useContext(Context)
    const { auth } = useContext(UserContext);

    function handleDelete(id, selectedOption = null) {
        removeItem(id, selectedOption)
    }

    function handleClear() {
        clear()
    }
    function getTotal() {
        let total = 0
        cart.forEach(e => total += e.item.price * e.quantity)
        return total
    }
    return (
        <div className="container">
            {auth ?
                    <Cart handleDelete={handleDelete} handleClear={handleClear} totalPrice={getTotal} />
                :
                <Redirect to={{ pathname: '/' }} />
            }
        </div>
    )
}
