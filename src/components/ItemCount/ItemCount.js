import React, { useState } from 'react';

export const ItemCount = ({ stock, initial, onAdd, onFinish }) => {
    const [contador, setContador] = useState(initial)
    const [lessflag, setLessflag] = useState(false)
    const [moreflag, setMoreflag] = useState(false)

    const sumar = () => {
        contador < stock && setContador(contador + 1)
        stock - contador === 1 && setMoreflag(true)
        setLessflag(false)
    }
    const restar = () => {
        contador && setContador(contador - 1)
        contador === 1 && setLessflag(true)
        setMoreflag(false)
    }
    const onEachAdd = () => {
        const msg = !contador ? "No has agregado ningún elemento" :
            (contador === 1) ? "Agregaste 1 solo elemento. No querés comprar más?" :
                `Agregaste ${contador} elementos.`
        alert(msg)
        if (contador) {
            onAdd(contador)
            onFinish()
        }
    }
    return (
        <React.Fragment>
            <div><div>
                <button disabled={lessflag} className="btn btn-info" onClick={restar}>-</button>
                <div className="font-weight-bold ml-2 mr-2">{contador}</div>
                <button disabled={moreflag} className="btn btn-info" onClick={sumar}>+</button>
            </div>
                <button className="btn btn-outline-info" onClick={onEachAdd}>Añadir</button>
            </div>        </React.Fragment>
    )
}