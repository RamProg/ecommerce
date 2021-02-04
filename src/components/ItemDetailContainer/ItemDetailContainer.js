import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { ItemDetails } from './ItemDetails/ItemDetails'
import './ItemDetailContainer.css'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase'


export const ItemDetailContainer = () => {

    let { itemId } = useParams()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const db = getFirestore()
        const itemsCollection = db.collection("items")
        const item = itemsCollection.doc(itemId)
        item.get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("el item no existe")
                    return;
                }
                console.log(doc)
                setProduct({ id: doc.id, ...doc.data() })
            }).catch(error => console.log("error searching item ", error))
            .finally(() => setLoading(false))
    }, [itemId])

    return (
        <div class="container center">
            {loading ? <Spinner animation="border" variant="info" /> :
                <ItemDetails item={product} />
            }
        </div>
    )
}