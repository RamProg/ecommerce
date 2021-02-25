import React from 'react'
// import './InputOrder.css'

export const InputOrder = ({ handleInput, handleSubmit }) => {

    return (
        <React.Fragment>
        <input onInput={e => handleInput(e.target.value)} type="text"></input>
        <input type="submit" onClick={(e) => handleSubmit(e)} value="Search"/>
        </React.Fragment>
    )
}