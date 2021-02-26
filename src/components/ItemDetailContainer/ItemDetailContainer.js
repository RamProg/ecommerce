import React, { useState, useEffect, useContext } from 'react'
import { ItemDetails } from './ItemDetails/ItemDetails'
import './ItemDetailContainer.css'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase'
import { Context } from "../../context/CartContext";
import { WLContext } from "../../context/WishListContext";
import { UserContext } from "../../context/UserContext";

export const ItemDetailContainer = () => {

    let { itemId } = useParams()

    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)
    const [finishFlag, setFinishFlag] = useState(false);
    const [addedQuantity, setAddedQuantity] = useState(0);
    const [stock, setStock] = useState(1);
    const [finishMessage, setfinishMessage] = useState("");
    const { addItem } = useContext(Context);
    const { addItemToWishList } = useContext(WLContext);
    const { auth } = useContext(UserContext);

    useEffect(() => {
        setLoading(true)
        const db = getFirestore()
        const itemsCollection = db.collection("items")
        const product = itemsCollection.doc(itemId)
        product.get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("el item no existe")
                    return;
                }
                setItem({ id: doc.id, ...doc.data() })
                setStock(doc.data().stock)
            }).catch(error => console.log("error searching item ", error))
            .finally(() => setLoading(false))
    }, [itemId])

    const showFinish = () => {
        setFinishFlag(true);
    };

    function addHandler(quantityToAdd) {
        if (quantityToAdd) {
            if (item.options && !item.selectedOption) {
                alert("You need to chose a variant")
            } else setAddedQuantity(quantityToAdd);
        }
    }

    function finish() {
        addItem(item, addedQuantity);
        setStock(stock - addedQuantity)
        setFinishFlag(false);
        setfinishMessage("Added to Cart")
        setAddedQuantity(0)
    }

    function toWishList() {
        addItemToWishList(item, addedQuantity);
        setFinishFlag(false);
        setfinishMessage("Added to WishList")
        setAddedQuantity(0)
    }

    function undo() {
        setAddedQuantity(0);
        setFinishFlag(false);
        setfinishMessage("")
        delete item.selectedOption
    }

    function getInitial(stock) {
        let initial = 1;
        if (parseInt(stock) <= 0) initial = 0
        return initial;
    }

    function handleOptionSelected(option) {
        selectOption(option)
    }

    function selectOption(selectedOption) {
        setItem({ ...item, selectedOption })
    }

    return (
        <ItemDetails item={item} finishFlag={finishFlag} addedQuantity={addedQuantity} stock={stock}
            setStock={setStock} finishMessage={finishMessage} auth={auth} showFinish={showFinish}
            addHandler={addHandler} finish={finish} toWishList={toWishList} undo={undo}
            getInitial={getInitial} handleOptionSelected={handleOptionSelected} loading={loading} />
    )
}