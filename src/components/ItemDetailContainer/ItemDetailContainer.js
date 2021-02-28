import React, { useState, useEffect, useContext, useRef } from 'react'
import { ItemDetails } from './ItemDetails/ItemDetails'
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
    const [variantChosen, setVariantChosen] = useState(false)
    const [showCartLink, setShowCartLink] = useState(false)
    const [initial, setInitial] = useState(0)
    const { addItem } = useContext(Context);
    const { addItemToWishList } = useContext(WLContext);
    const { auth } = useContext(UserContext);
    const cartContext = useRef(0);
    cartContext.current = useContext(Context);

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
                let stockInCart = 0
                cartContext.current.cart.forEach(e => {
                    if (e.item.id === doc.id) stockInCart = e.quantity
                });
                setStock(doc.data().stock - stockInCart)
            }).catch(error => console.log("error searching item ", error))
            .finally(() => setLoading(false))
    }, [itemId])

    useEffect(() => {
        setInitial(stock > 0 ? 1 : 0)
    }, [stock])

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
        setShowCartLink(true)

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

    function handleOptionSelected(option) {
        !variantChosen && setVariantChosen(true)
        setfinishMessage("")
        setShowCartLink(false)
        selectOption(option)
    }

    function selectOption(selectedOption) {
        setItem({ ...item, selectedOption })
    }

    return (
        <ItemDetails item={item} finishFlag={finishFlag} addedQuantity={addedQuantity} stock={stock}
            setStock={setStock} finishMessage={finishMessage} auth={auth} showFinish={showFinish}
            addHandler={addHandler} finish={finish} toWishList={toWishList} undo={undo}
            initial={initial} handleOptionSelected={handleOptionSelected} loading={loading}
            variantChosen={variantChosen} setVariantChosen={setVariantChosen} showCartLink={showCartLink} />
    )
}