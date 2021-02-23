import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/CartContext'
import { getFirestore } from '../../firebase'
import firebase from 'firebase/app'
import '@firebase/firestore'
import { Cart } from './Cart/Cart'
import { Redirect } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

export const CartContainer = () => {
    const _firebase = useFirebaseApp();

    const { cart, removeItem, clear } = useContext(Context)
    const [orderNumber, setOrderNumber] = useState(null)
    const [ableFinish, setAbleFinish] = useState("disabled")
    const { auth } = useContext(UserContext);

    const mail = _firebase.auth().currentUser.email

    const [ClientData, setClientData] = useState({ mail })

    const CREATED = "generada"

    function updateData(id, data) {
        if (!data) setAbleFinish("disabled")
        setClientData({ ...ClientData, [id]: data })
    }

    useEffect(() => {
        if (ClientData.name && ClientData.phone && ClientData.mail) setAbleFinish("")
    }, [ClientData])


    function getTotal() {
        let total = 0
        cart.forEach(e => total += e.item.price * e.quantity)
        return total
    }

    function getItems() {
        return cart.map(e => ({
            id: e.item.id,
            title: e.item.title,
            quantity: e.quantity,
            price: e.item.price
        }))
    }
    function getQuantity() {
        let total = 0
        cart.forEach(e => total += e.quantity)
        return total
    }

    function updateStock(db, order) {
        const items = db.collection("items")
        order.items.forEach(e => {
            let _item = items.doc(e.id)
            _item.get()
                .then((doc) => {
                    let oldStock = doc.data().stock
                    _item.update({
                        stock: oldStock - e.quantity
                    })
                })
                .catch((err) => {
                    console.log("There has been an error ", err)
                }).finally(() => {

                })
        })
    }

    function validateName(name) {
        let flag = false
        if (name && name.length && !/\d/.test(name)) flag = true
        else alert("You must enter your full name to place an order. Only letters are allowed")
        return flag
    }

    function validatePhone(phone) {
        let flag = false
        if (phone && phone.length && /^\d+$/.test(phone)) flag = true
        else alert("You must enter your phone to place an order. Only numbers are allowed.")
        return flag
    }
    function validateMail(mail) {
        let flag = false
        if (mail && mail.length && mail.includes('@')) flag = true
        else alert("You must enter a valid email.")
        return flag
    }

    async function validateOneStock(i, items) {
        return new Promise((resolve, reject) => {
            let doc = items.doc(i.id)
            doc.get()
                .then((e) => {
                    let stock = e.data().stock
                    if (!(stock >= i.quantity)) {
                        resolve(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
                .finally(() => {
                    resolve(true)
                })
        })

    }

    async function validateStock(db, itemsOnCart) {
        const items = db.collection("items")
        for (let i of itemsOnCart) {
            const answer = await validateOneStock(i, items)
            if (!answer) return false
        }
        return true
    }



    async function createOrder(e) {
        e.preventDefault()
        if (!validateName(ClientData.name) || !validatePhone(ClientData.phone) || !validateMail(ClientData.mail)) {
            // do not create the order if some data is not validated
        } else {
            const items = getItems()
            //create the order
            setOrderNumber('loading')
            const order = {
                buyer: ClientData,
                items,
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                quantity: getQuantity(),
                total: getTotal(),
                status: CREATED,
            }
            const db = getFirestore()
            const batch = db.batch()

            // validate the stock
            const stockIsAvailable = await validateStock(db, items)
            console.log("desde createORder", stockIsAvailable)
            if (!stockIsAvailable) alert("no stock")
            else {
                const newElement = db.collection("orders").doc()
                batch.set(newElement, order)
                batch.commit()
                    .then(() => {
                        const orderId = newElement.id
                        console.log(orderId)
                        updateStock(db, order)
                        setOrderNumber(orderId)
                    }).catch(err => {
                        console.log("There has been an error ", err)
                        setOrderNumber(null)
                    })
            }
        }
    }


    function handleDelete(id, selectedOption = null) {
        removeItem(id, selectedOption)
    }

    function handleClear() {
        clear()
    }

    function totalPrice() {
        let price = 0
        cart.forEach(e => price += e.item.price * e.quantity);
        return price
    }

    return (
        <React.Fragment>
            {auth ?
                <Cart handleDelete={handleDelete} handleClear={handleClear} totalPrice={getTotal}
                    createOrder={createOrder} updateData={updateData} orderNumber={orderNumber}
                    ableFinish={ableFinish} mail={mail} />
                :
                <Redirect to={{ pathname: '/' }} />
            }
        </React.Fragment>
    )
}
