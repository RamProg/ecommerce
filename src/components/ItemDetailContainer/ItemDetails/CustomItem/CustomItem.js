import React from "react";
import Form from 'react-bootstrap/Form'

export const CustomItem = ({ options, handleOptionSelected }) => {

    return (
        <React.Fragment>
            <Form className="container">
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control defaultValue="default" onChange={o => handleOptionSelected(o.target.value)} as="select" custom>
                        <option value="default" disabled="disabled">Select a variant</option>
                        {options.map(e => {
                           return <option key={e}>{e}</option>
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
};
