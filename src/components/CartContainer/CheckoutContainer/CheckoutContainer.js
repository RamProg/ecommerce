import React, { useState, useEffect, useContext } from 'react'
// import './Checkout.css'
import { Checkout } from './Checkout/Checkout'
import { getFirestore } from '../../../firebase'
import firebase from 'firebase/app'
import { useFirebaseApp } from 'reactfire'
import { Context } from '../../../context/CartContext'
import { UserContext } from "../../../context/UserContext";
import { Redirect } from 'react-router-dom'

export const CheckoutContainer = () => {

    const CREATED = "generada"
    const _firebase = useFirebaseApp();
    const mail = _firebase.auth().currentUser.email
    const { cart, clear } = useContext(Context)
    const [orderNumber, setOrderNumber] = useState(null)
    const [ableFinish, setAbleFinish] = useState("disabled")
    const [ClientData, setClientData] = useState({ mail })
    const [ableForm, setAbleForm] = useState("")
    const { auth } = useContext(UserContext);



    useEffect(() => {
        if (ClientData.name && ClientData.phone && ClientData.mail) setAbleFinish("")
    }, [ClientData])

    async function validateStock(db, itemsOnCart) {
        const items = db.collection("items")
        for (let i of itemsOnCart) {
            const answer = await validateOneStock(i, items)
            if (!answer) return false
        }
        return true
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
            price: e.item.price,
            description: e.item.description,
            selectedOption: e.item.selectedOption ? e.item.selectedOption : ""
        }))
    }
    function getQuantity() {
        let total = 0
        cart.forEach(e => total += e.quantity)
        return total
    }

    async function createOrder(e) {
        e.preventDefault()
        setAbleFinish("disabled")
        setAbleForm("disabled")
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
            if (!stockIsAvailable) alert("We are sorry, there is not enough available stock for your purchase")
            else {
                const newElement = db.collection("orders").doc()
                batch.set(newElement, order)
                batch.commit()
                    .then(() => {
                        const orderId = newElement.id
                        updateStock(db, order)
                        setOrderNumber(orderId)
                        clear()
                    }).catch(err => {
                        console.log("There has been an error ", err)
                        setOrderNumber(null)
                    })
            }
        }
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

    function updateData(id, data) {
        if (!data) setAbleFinish("disabled")
        setClientData({ ...ClientData, [id]: data })
    }

    return (
        <React.Fragment>
            {auth ?
                <Checkout createOrder={createOrder} updateData={updateData} orderNumber={orderNumber}
                    ableFinish={ableFinish} mail={mail} ableForm={ableForm} />
                :
                <Redirect to={{ pathname: '/' }} />
            }
        </React.Fragment>
    )
}