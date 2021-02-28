import React from 'react';
import { Item } from './Item/Item'
import Spinner from 'react-bootstrap/Spinner'
import './ItemList.css';

export const ItemList = ({ items, categoryKey, title, loading }) => {

    return (

        <div className="container mt-5">

            {categoryKey && <div><div>{title}</div><br /></div>}

            {loading ? <Spinner animation="border" variant="info" /> :

                <React.Fragment>
                    <div className="d-flex">
                        {items && items.map(e => <Item className="inline" key={e.id} item={e} />)}
                    </div>
                </React.Fragment>
            }
        </div>



    )
}