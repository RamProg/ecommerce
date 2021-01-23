import React from 'react';
import './ItemCount.css';

export const ItemCount = ({ restar, sumar, onAdd, contador }) => {

    return (
        <React.Fragment>

            <div>
            <button className="btn btn-info" onClick={restar}>-</button>
            <div className="font-weight-bold ml-2 mr-2">{contador}</div>
            <button className="btn btn-info" onClick={sumar}>+</button>
            </div>
            <button className="btn btn-outline-info" onClick={onAdd}>Añadir</button>

            


        </React.Fragment>
    )
}