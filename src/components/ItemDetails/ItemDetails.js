import React from 'react';
// import {useParams} from 'react-router-dom'
import './ItemDetails.css';

export const ItemDetails = ({ item }) => {

// let itemId = useParams()
    return (
        <React.Fragment>
            {console.log(item)}
           <h1>{item.title}</h1>
           <h2>{item.description}</h2>
           <h3>{item.price}</h3>
           <img src={item.pictureUrl} alt="pic" />
        </React.Fragment>
    )
}