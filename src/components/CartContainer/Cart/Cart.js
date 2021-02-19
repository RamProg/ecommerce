import React, { useContext } from 'react'
import { Context } from '../../../context/CartContext'
import { Link } from 'react-router-dom'
import './Cart.css'
import Alert from 'react-bootstrap/Alert';

export const Cart = ({ handleDelete, handleClear, totalPrice, createOrder, updateData, orderNumber, ableFinish, mail }) => {
    const { cart } = useContext(Context)

    function getKey(id, selectedOption = null) {
        let value = id
        if (selectedOption) value += selectedOption
        return value
    }

    return (
        <div class="container cart">
            <h1>This is cart</h1>
            {cart.length ? <div>
                <ul>
                    {cart.map(e =>
                        (e.item.id && e.quantity) &&
                        <li key={getKey(e.item.id, e.item.selectedOption)}>{e.item.title} {e.item.selectedOption && <span>| Variant: {e.item.selectedOption} |</span>} $ {e.item.price} c/u | x {e.quantity} | TOTAL $ {e.item.price * e.quantity}<span> </span>
                            <button onClick={() => handleDelete(e.item.id, e.item.selectedOption)}>Eliminar elemento</button></li>)}
                </ul>
                <p>Precio total: $ {totalPrice()}</p>
                <button onClick={handleClear}>Vaciar carrito</button><br />
                <br />
                <form>
                    <label for="name">Name:
                    <input type="text" onChange={e => updateData(e.target.id, e.target.value)} id="name"></input></label><br />
                    <label for="phone">Phone:
                    <input type="text" onChange={e => updateData(e.target.id, e.target.value)} id="phone"></input></label><br />
                    <label for="mail">Email:
                    <input type="text" value={mail} disabled="disabled" id="mail"></input></label><br />
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