import React, { useState } from 'react'

export const WLContext = React.createContext([]);

export const WishListContext = ({ children }) => {
    const [wishList, setWishList] = useState([])
    const [ammountWishList, setAmmountWishList] = useState(0)

    const addItemToWishList = (item, quantity) => {
        let index = wishList.indexOf(isInWishList(item.id))
        if (index === -1) {
            if (item && quantity) {
                setWishList([
                    ...wishList,
                    {
                        item,
                        quantity
                    }]

                )
                setAmmountWishList(ammountWishList + quantity)
            }
        } else if (item && quantity) {
            wishList[index].quantity += quantity
            setAmmountWishList(ammountWishList + quantity)
        }
    }

    const removeItemFromWishList = itemId => {
        if (itemId) {
            let index = wishList.indexOf(isInWishList(itemId))
            if (index >= 0) {
                setAmmountWishList(ammountWishList - wishList[index].quantity)
                setWishList([...wishList.slice(0, index), ...wishList.slice(index + 1)])
            }
        }
    }
    const clear = () => {
        setWishList([])
        setAmmountWishList(0)
    }

    const isInWishList = id => wishList.find(e => e.item.id === id)

    return (
        <WLContext.Provider value={{ wishList, ammountWishList, addItemToWishList, removeItemFromWishList, clear, isInWishList }}>
            {children}
        </WLContext.Provider>
    )
}