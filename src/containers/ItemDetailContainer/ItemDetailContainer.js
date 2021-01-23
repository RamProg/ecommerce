import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { ItemDetails } from '../../components/ItemDetails/ItemDetails'
import './ItemDetailContainer.css'

const getItems = () => {
    return [
        {
            id: 103265,
            title: "Aerodynamic 3000",
            description: "Nave para viajes de larga distancia",
            price: "43000",
            pictureUrl: "../img/spaceship.jpg",
        },
        {
            id: 897465,
            title: "Axios Ultra",
            description: "Combustible para pistear como un campeón",
            price: "140",
            pictureUrl: "../img/spaceship.jpg",
        },
        {
            id: 465512,
            title: "Calcos para la nave",
            description: "Colección de calcomanías de dragon ball y los caballeros del zodiaco",
            price: "91",
            pictureUrl: "../img/spaceship.jpg",
        }
    ]
}

export const ItemDetailContainer = () => {
    const [products, setProducts] = useState([{}])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const call = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getItems)
            }, 2000)
        })

        call.then(response => {
            setLoading(false)
            return response
        }).then(response => setProducts(response))
    }, [])

    // useEffect(() => {
    //     console.log(products)
    // },[products])

    return (
        <React.Fragment>
            {loading ? <Spinner animation="border" variant="info" /> :
                <ItemDetails item={products[0]} />
            }
        </React.Fragment>
    )
}