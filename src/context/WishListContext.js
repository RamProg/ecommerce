import React, { useState } from 'react'

export const WLContext = React.createContext([]);

export const WishListContext = ({ children }) => {
    const [wishList, setWishList] = useState([])
    const [ammountWishList, setAmmountWishList] = useState(0)

    const addItemToWishList = (item, quantity) => {
        let index = wishList.indexOf(isInWishList(item.id, item.selectedOption))
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

    const removeItemFromWishList = (itemId, selectedOption = null) => {
        if (itemId) {
            let index = wishList.indexOf(isInWishList(itemId, selectedOption))
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

    const isInWishList = (id, option = null) => {
        let value
        if (!option) value = wishList.find(e => e.item.id === id)
        else {
            value = wishList.find(e => e.item.id === id && e.item.selectedOption === option)
        }
        return value
    }

    return (
        <WLContext.Provider value={{ wishList, ammountWishList, addItemToWishList, removeItemFromWishList, clear, isInWishList }}>
            {children}
        </WLContext.Provider>
    )
}