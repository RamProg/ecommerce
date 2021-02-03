import React, { useState, useEffect } from 'react'
import { ItemList } from './ItemList/ItemList'
import Spinner from 'react-bootstrap/Spinner'
import './ItemListContainer.css'
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

export const ItemListContainer = ({ greeting }) => {

    let { categoryId } = useParams(null)

    const getTitle = () => { return `This is category ${categoryId}` }

    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const call = new Promise((resolve, reject) => {
            setLoading(true)
            setTimeout(() => {
                resolve(allItems)
            }, 1000)
        })
        call.then(response => {
            setLoading(false)
            return categoryId ?
            response.filter(e => e.category === categoryId) :
            response
        })
            .then(response => setProducts(response))
    }, [categoryId])

    return (

        <div class="container wrapper">
            {/* <div id="greeting">
                {greeting}
            </div>
            <div id="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </div> */}

            {categoryId && <div><div>{getTitle()}</div><br /></div>}

            {loading ? <Spinner animation="border" variant="info" /> :

                <ItemList items={products} />
            }
        </div>

    )
}