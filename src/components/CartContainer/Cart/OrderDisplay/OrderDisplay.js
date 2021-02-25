import React from 'react'
// import './OrderDisplay.css'

export const OrderDisplay = ({ order, handleDelete }) => {


    return (
        <React.Fragment>
            {order.map(e =>
                (e.item.id && e.quantity) &&
                <li key={e.item.id + e.item.selectedOption}>{e.item.title} {e.item.selectedOption && <span>| Variant: {e.item.selectedOption} |</span>} $ {e.item.price} c/u | x {e.quantity} | TOTAL $ {e.item.price * e.quantity}<span> </span>
                    {handleDelete && <button onClick={() => handleDelete(e.item.id, e.item.selectedOption)}>Eliminar elemento</button>}
                </li>)
            }
        </React.Fragment>
    )
}