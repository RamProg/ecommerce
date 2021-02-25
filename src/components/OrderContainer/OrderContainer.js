import React, { useState } from 'react'
import './OrderContainer.css'
import { OrderDisplay } from '../CartContainer/Cart/OrderDisplay/OrderDisplay'
import { InputOrder } from './InputOrder/InputOrder'
import Spinner from 'react-bootstrap/Spinner'
import { getFirestore } from '../../firebase'

export const OrderContainer = () => {

    const [orderId, setOrderId] = useState(null)
    const [order, setOrder] = useState(null)
    const [loadingOrder, setLoadingOrder] = useState(false)
    const [wrongOrderIdFlag, setWrongOrderIdFlag] = useState(false)

    function handleInput(id) {
        setOrderId(id)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoadingOrder(true)
        orderId ? loadNewOrder(orderId)
            :
            alert("You must enter an Order Id")
        setLoadingOrder(false)
    }

    function loadNewOrder(orderId) {
        const db = getFirestore()
        const orders = db.collection("orders")
        const orderDoc = orders.doc(orderId.toString())
        orderDoc.get()
            .then((doc) => {
                if (doc.exists) {
                    setWrongOrderIdFlag(false)
                    const itemsRaw = doc.data().items
                    const items = []
                    itemsRaw.forEach(e => {
                        items.push({ item: e, quantity: e.quantity })
                    });
                    setOrder(items)
                } else {
                    setOrder(null)
                    setWrongOrderIdFlag(true)
                    return;
                }
            }).catch(error => console.log("error searching order ", error))
    }

    return (
        <div className="container">
            <br />
            <div>Enter your order number:</div>
            <InputOrder handleInput={handleInput} handleSubmit={handleSubmit} />
            { loadingOrder && <Spinner animation="border" variant="info" />}
            { order && <div><OrderDisplay order={order} /></div>}
            { wrongOrderIdFlag && <div>The order number you entered is not valid</div>}
        </div>
    )
}