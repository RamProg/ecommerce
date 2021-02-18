import React, { useContext } from 'react';
import './CartWidget.css';
import { Context } from '../../../context/CartContext'

export const CartWidget = () => {
    const { ammount } = useContext(Context)

    return (
        <div className="widget">
            <img id="cart" className="mt-2" src="/img/cart.png" alt="cart"></img>
            {ammount ?
                <span className="count-widget"><span className="count-widget-text">{ammount}</span></span>
                :
                <React.Fragment></React.Fragment>
            }
        </div>
    )
}