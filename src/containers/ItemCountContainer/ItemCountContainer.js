import React, { useState } from 'react';
import { ItemCount } from '../../components/ItemCount/ItemCount'

export const ItemCountContainer = ({ stock, initial }) => {

    const [contador, setContador] = useState(initial)
    const sumar = () => { contador < stock && setContador(contador + 1) }
    const restar = () => { contador && setContador(contador - 1) }
    const onAdd = () => {
        const msg = !contador ? "No has agregado ningún elemento" : 
        (contador === 1) ? "Agregaste 1 solo elemento. No querés comprar más?" :
        `Agregaste ${contador} elementos.`
        alert(msg)
        console.log(msg)
    }
    return (
        <React.Fragment>
            <ItemCount restar={restar} sumar={sumar} onAdd={onAdd} contador={contador} />
        </React.Fragment>
    )
}