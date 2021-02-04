import React, { useState, useEffect } from 'react'
import { ItemList } from './ItemList/ItemList'
import Spinner from 'react-bootstrap/Spinner'
import './ItemListContainer.css'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../firebase'

export const ItemListContainer = ({ greeting }) => {

    let { categoryKey } = useParams(null)

    const [title, setTitle] = useState("")
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)


    const getHandler = (itemsCollection) => {
        itemsCollection.limit(3).get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log("coleccion vacia")
                }
                setProducts(querySnapshot.docs.map(doc => {
                    return ({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                )
            }).catch(error => console.log("error searching documents ", error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        const db = getFirestore()
        let itemsCollection = db.collection("items")
        const categoriesCollection = db.collection("categories")
        console.log(categoryKey)
        if (categoryKey) {
            console.log("hay categorieKEy")
            categoriesCollection.where('key', '==', categoryKey).get()
                .then(response => {
                    console.log("hay response")
                    console.log(response)
                    console.log(response.docs)
                    let categoryId = response.docs[0].id
                    itemsCollection = db.collection("items").where('category', '==', categoryId)
                    setTitle(response.docs[0].data().name)
                    getHandler(itemsCollection)
                })
                .catch(error => console.log("error en categorias ", error))
        } else {
            getHandler(itemsCollection)
        }
    }, [categoryKey])

    return (

        <div class="container wrapper">

            {categoryKey && <div><div>{title}</div><br /></div>}

            {loading ? <Spinner animation="border" variant="info" /> :

                <ItemList items={products} />
            }
        </div>

    )
}