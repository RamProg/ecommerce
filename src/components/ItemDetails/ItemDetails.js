import React, { useState } from 'react';
// import {useParams} from 'react-router-dom'
import './ItemDetails.css';
import { ItemCount } from '../../components/ItemCount/ItemCount'
import { Link } from 'react-router-dom'

export const ItemDetails = ({ item }) => {

    const [finishFlag, setFinishFlag] = useState(false)
    const [addedQuantity, setAddedQuantity] = useState(0)

    const showFinish = () => {
        setFinishFlag(true)
    }
    function addHandler(quantityToAdd) {
        if (quantityToAdd) {
            setAddedQuantity(quantityToAdd)
            // return addedQuantity
        }
    }
    return (
        <React.Fragment>
            <h1>{item.title}</h1>
            <h2>{item.description}</h2>
            <h3>{item.price}</h3>
            <img id="product-image" src={item.pictureUrl} alt="pic" />
            <div>{!addedQuantity &&
                <ItemCount stock={5} initial={1} onAdd={addHandler} onFinish={showFinish} />
            }
                {finishFlag &&
                    <Link to="/cart"><button>Finaliza tu compra</button></Link>
                }
            </div>
        </React.Fragment>
    )
}