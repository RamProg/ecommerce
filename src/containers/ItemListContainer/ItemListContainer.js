import React, { useState, useEffect } from 'react'
import { ItemList } from '../../components/ItemList/ItemList'
import Spinner from 'react-bootstrap/Spinner'
import './ItemListContainer.css'

const items = [
    {
        id: 103265,
        title: "Aerodynamic 3000",
        description: "Nave para viajes de larga distancia",
        price: "43000",
        pictureUrl: "./img/spaceship.jpg",
    },
    {
        id: 897465,
        title: "Axios Ultra",
        description: "Combustible para pistear como un campeón",
        price: "140",
        pictureUrl: "./img/spaceship.jpg",
    },
    {
        id: 465512,
        title: "Calcos para la nave",
        description: "Colección de calcomanías de dragon ball y los caballeros del zodiaco",
        price: "91",
        pictureUrl: "./img/spaceship.jpg",
    }
]

export const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const call = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items)
            }, 2000)
        })

        call.then(response => {
            console.log(response)
            setLoading(false)
            setProducts(response)
        })
    }, [])

    // useEffect(() => {
    //     console.log(products)
    // },[products])

    return (

        <div id="wrapper">
            {/* <div id="greeting">
                {greeting}
            </div>
            <div id="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </div> */}

            {loading ?   <Spinner animation="border" variant="info"/> :

            <ItemList items={products} />
            }
        </div>

    )
}