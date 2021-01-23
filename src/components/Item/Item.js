import React from 'react';
import Card from 'react-bootstrap/Card'
import { ItemCountContainer } from '../../containers/ItemCountContainer/ItemCountContainer'
import { Link } from 'react-router-dom'
import './Item.css';

export const Item = ({ item }) => {

    // TODO corregir el tamaño de la

    return (
        <React.Fragment>
            <Card as={Link} to={`/item/${item.id}`} className="mr-2" style={{ width: '18rem' }}>

                <Card.Img variant="top" src={item.pictureUrl} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
    $ {item.price}


                </Card.Body>
            </Card>
            <p>
            <ItemCountContainer stock={5} initial={1} />
            </p>
        </React.Fragment>
    )
}