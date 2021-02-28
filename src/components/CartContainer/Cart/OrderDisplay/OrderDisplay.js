import React from 'react'
// import './OrderDisplay.css'
import Table from 'react-bootstrap/Table';


export const OrderDisplay = ({ order, handleDelete }) => {


    return (
        <React.Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        {handleDelete && <th>Remove</th>}
                    </tr>
                </thead>
                <tbody>
                    {order.map(e =>
                        (e.item.id && e.quantity) &&
                        <tr key={e.item.id + e.item.selectedOption}>
                            <td>{e.item.title} {e.item.selectedOption && <span> {e.item.selectedOption}</span>} </td>
                            <td>$ {e.item.price} c/u </td>
                            <td>{e.quantity} </td>
                            <td>$ {e.item.price * e.quantity}<span> </span></td>
                            {handleDelete && <td><button onClick={() => handleDelete(e.item.id, e.item.selectedOption)}>Eliminar elemento</button></td>}
                        </tr>)
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
}