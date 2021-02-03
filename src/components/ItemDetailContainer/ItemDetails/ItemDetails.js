import React, { useState, useContext } from 'react';
// import {useParams} from 'react-router-dom'
import './ItemDetails.css';
import { ItemCount } from './ItemCount/ItemCount'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../../../context/cartContext'

export const ItemDetails = ({ item }) => {

    const [finishFlag, setFinishFlag] = useState(false)
    const [addedQuantity, setAddedQuantity] = useState(0)
    const [cart, addItem, removeItem, clear, isInCart] = useContext(CartContext)
    const history = useHistory();

    const showFinish = () => {
        setFinishFlag(true)
    }
    function addHandler(quantityToAdd) {
        if (quantityToAdd) {
            setAddedQuantity(quantityToAdd)
        }
    }
    function finish() {
        console.log("finish")
        console.log(item, addedQuantity)
        addItem(item, addedQuantity)
        history.push("/cart");
    }

    function undo() {
        setAddedQuantity(0)
        setFinishFlag(false)
    }

    return (
        <React.Fragment>
            <div class="item-container">
                <div class="inside-item">
                    <h1>{item.title}</h1>
                    <h2>{item.description}</h2>
                    <h3 class="price">{item.price}</h3>
                    <img id="product-image" src={item.pictureUrl} alt="pic" />
                    <div>{!addedQuantity &&
                        <ItemCount stock={5} initial={1} onAdd={addHandler} onFinish={showFinish} />
                    }
                        {finishFlag && <div> Seleccionaste {addedQuantity} items <br />
                            <button onClick={undo}>Deshacer</button>
                            <button onClick={finish}>Agregar al carrito</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}