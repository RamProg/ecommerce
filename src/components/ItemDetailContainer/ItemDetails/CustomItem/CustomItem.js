import React from "react";
import Form from 'react-bootstrap/Form'

export const CustomItem = ({ options, handleOptionSelected }) => {

    return (
        <React.Fragment>
            <Form className="container">
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control onChange={o => handleOptionSelected(o.target.value)} as="select" custom>
                        <option selected="true" disabled="disabled">Select a variant</option>
                        {options.map(e => {
                           return <option>{e}</option>
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
};
