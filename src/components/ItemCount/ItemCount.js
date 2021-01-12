import React, { useState } from 'react';
import './ItemCount.css';

export const ItemCount = ({ stock, initial, onAdd }) => {

    const [contador, setContador] = useState(parseInt(initial))

    const sumar = () => { contador < stock && setContador(contador + 1) }
    const restar = () => { contador && setContador(contador - 1) }
    const ondAdd = () => {console.log(contador)}
    return (
        <React.Fragment>
            <button onClick={restar}>-</button>{contador}<button onClick={sumar}>+</button>
            <br/>
            <button onClick={ondAdd}>Anotámelo en la cuenta</button>
        </React.Fragment>
    )
}