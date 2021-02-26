import React from 'react'
import { Link } from 'react-router-dom'
// import './Cart.css'
import Alert from 'react-bootstrap/Alert';

export const Checkout = ({ createOrder, updateData, orderNumber, ableFinish, mail, ableForm }) => {

    return (
        <div className="container">
            <h1>This is Checkout</h1>
            <form>
                <label htmlFor="name">Name:
                    <input type="text" disabled={ableForm} onChange={e => updateData(e.target.id, e.target.value)} id="name"></input></label><br />
                <label htmlFor="phone">Phone:
                    <input type="text" disabled={ableForm} onChange={e => updateData(e.target.id, e.target.value)} id="phone"></input></label><br />
                <label htmlFor="mail">Email:
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
            <Link to="/">Back to Shop</Link>
            <br /><br />
            <Link to="/cart">Back to Cart</Link>
            <br /><br />
            <Link to="/orders">Go to orders</Link>
        </div>
    )
}