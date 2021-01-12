import React from 'react'
import { ItemCount } from '../ItemCount/ItemCount'
import './ItemListContainer.css'

export const ItemListContainer = ({ greeting }) => {

    return (

        <div id="wrapper">
            <div id="greeting">
                {greeting}
            </div>
            <div id="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </div>
            <ItemCount stock="5" initial="1" />
        </div>

    )
}