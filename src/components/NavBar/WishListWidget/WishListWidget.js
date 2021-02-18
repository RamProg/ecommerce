import React, { useContext } from 'react';
import './WishListWidget.css';
import { WLContext } from '../../../context/WishListContext'

export const WishListWidget = () => {
    const { ammountWishList } = useContext(WLContext)

    return (
        <div className="widget">
            <img id="cart" className="mt-2" src="/img/wishlist.png" alt="cart"></img>
            {ammountWishList ?
                <span className="count-widget"><span className="count-widget-text">{ammountWishList}</span></span>
                :
                <React.Fragment></React.Fragment>
            }
        </div>
    )
}