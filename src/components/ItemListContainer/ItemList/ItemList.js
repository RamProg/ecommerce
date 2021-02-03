import React from 'react';
import {Item} from './Item/Item'
import './ItemList.css';

export const ItemList = ({ items }) => {

    return (
        <React.Fragment>
            <div class="d-flex">
            {items && items.map(e => <Item class="inline" key={e.id} item={e} />)}
            </div>
        </React.Fragment>
    )
}