import React from 'react';
import {Item} from '../Item/Item'
// import './ItemList.css';

export const ItemList = ({ items }) => {

    return (
        <React.Fragment>
            <div className="d-flex">
            {items && items.map(e => <Item key={e.id} item={e} />)}
            </div>
        </React.Fragment>
    )
}