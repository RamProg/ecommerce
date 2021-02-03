import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { ItemDetails } from './ItemDetails/ItemDetails'
import './ItemDetailContainer.css'
import { useParams } from 'react-router-dom'

const allItems = [
    {
        id: '103265',
        title: "Aerodynamic 3000",
        description: "Nave para viajes de larga distancia",
        category: '1',
        price: "43000",
        pictureUrl: "../img/spaceship.jpg",
    },
    {
        id: '897465',
        title: "Axios Ultra",
        description: "Combustible para pistear como un campeón",
        category: '2',
        price: "140",
        pictureUrl: "../img/spaceship.jpg",
    },
    {
        id: '465512',
        title: "Calcos para la nave",
        description: "Colección de calcomanías de dragon ball y los caballeros del zodiaco",
        category: '3',
        price: "91",
        pictureUrl: "../img/spaceship.jpg",
    }
]

export const ItemDetailContainer = () => {

    let { itemId } = useParams()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const call = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(allItems)
            }, 1000)
        })
        call.then(response => {
            setProduct(response.find(e => e.id === itemId))
            setLoading(false)
        })
    }, [itemId])

    return (
        <div class="container center">
            {loading ? <Spinner animation="border" variant="info" /> :
                <ItemDetails item={product} />
            }
        </div>
    )
}