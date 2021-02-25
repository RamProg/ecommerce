import React, { useState } from 'react'

export const Context = React.createContext([]);

export const CartContext = ({ children }) => {
    const [cart, setCart] = useState(initializeCart())
    const [ammount, setAmmount] = useState(initializeAmmount())

    function initializeCart() {
        let response = []
        const sessionCart = localStorage.getItem('cart')
        if (sessionCart) {
            response = JSON.parse(sessionCart)
        }
        return response
    }

    function initializeAmmount() {
        let response = 0
        const sessionCart = localStorage.getItem('cart')
        if (sessionCart) {
            JSON.parse(sessionCart).forEach(e => {
                response += e.quantity
            }
            )
        }
        return response
    }

    function setSessionAndCart(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    }

    const addItem = (item, quantity) => {
        let index = cart.indexOf(isInCart(item.id, item.selectedOption))
        if (index === -1) {
            if (item && quantity) {
                setSessionAndCart([
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
                setSessionAndCart([...cart.slice(0, index), ...cart.slice(index + 1)])
            }
        }
    }
    const clear = () => {
        setSessionAndCart([])
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