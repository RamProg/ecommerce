import React from 'react';
import Card from 'react-bootstrap/Card'
import { ItemCountContainer } from '../../containers/ItemCountContainer/ItemCountContainer'

import './Item.css';

export const Item = ({ item }) => {

// TODO corregir el tamaño de la

    return (
        <React.Fragment>
            <Card className="mr-2" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.pictureUrl} />

                <Card.Body>

                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
    </Card.Text>
    $ {item.price}

    <ItemCountContainer stock={5} initial={1} />
                </Card.Body>
            </Card>


        </React.Fragment>
    )
}