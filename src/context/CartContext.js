import React, { useState } from 'react'

export const Context = React.createContext([]);

export const CartContext = ({ children }) => {
    const [cart, setCart] = useState([])
    const [ammount, setAmmount] = useState(0)

    const addItem = (item, quantity) => {
        let index = cart.indexOf(isInCart(item.id, item.selectedOption))
        if (index === -1) {
            if (item && quantity) {
                setCart([
                    ...cart,
                    {
                        item,
                        quantity
                    }]

                )
                setAmmount(ammount + quantity)
            }
        } else if (item && quantity) {
            cart[index].quantity += quantity
            setAmmount(ammount + quantity)
        }
    }

    const removeItem = (itemId, selectedOption = null) => {
        if (itemId) {
            let index = cart.indexOf(isInCart(itemId, selectedOption))
            if (index >= 0) {
                setAmmount(ammount - cart[index].quantity)
                setCart([...cart.slice(0, index), ...cart.slice(index + 1)])
            }
        }
    }
    const clear = () => {
        setCart([])
        setAmmount(0)
    }

    const isInCart = (id, option = null) => {
        let value
        if (!option) value = cart.find(e => e.item.id === id)
        else {
            value = cart.find(e => e.item.id === id && e.item.selectedOption === option)
        }
        return value
    }

    return (
        <Context.Provider value={{ cart, ammount, addItem, removeItem, clear, isInCart }}>
            {children}
        </Context.Provider>
    )
}