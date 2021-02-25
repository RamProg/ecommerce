import React from "react";
// import {useParams} from 'react-router-dom'
import "./ItemDetails.css";
import { ItemCount } from "./ItemCount/ItemCount";
import { CustomItem } from "./CustomItem/CustomItem";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

export const ItemDetails = ({ item, finishFlag, addedQuantity, stock, finishMessage, auth,
  showFinish, addHandler, finish, toWishList, undo, getInitial, handleOptionSelected, loading}) => {

  return (

    <div class="container center">
      {loading ?
        <Spinner animation="border" variant="info" /> :
        item.id ?
          <React.Fragment>
            <div class="item-container">
              <div class="inside-item">
                <h1> {item.title} </h1> <h2> {item.description} </h2>{" "}
                <h3 class="price"> {item.price} </h3>{" "}
                <img id="product-image" src={item.pictureUrl} alt="pic" />
                <div>
                  {auth && !addedQuantity && <div>
                    {item.options && <CustomItem options={item.options} handleOptionSelected={handleOptionSelected} />}
                    <ItemCount
                      stock={stock}
                      initial={getInitial(item.stock)}
                      onAdd={addHandler}
                      onFinish={showFinish}
                    />
                    <p>{finishMessage}</p>
                    {parseInt(item.stock) <= 0 && <p>Sorry, there is no more stock</p>}
                  </div>}
                  {finishFlag && (
                    <div>Seleccionaste {addedQuantity} items <br />
                      <button onClick={undo}> Deshacer </button>
                      <button onClick={finish}> Agregar al carrito </button>
                      <button onClick={toWishList}> Agregar a la WishList </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
          :
          <p><br />Wow! You are looking for a product that does not exist, maybe it has not been invented yet? Try again in a couple years!
            <br /><br /><Link to="/">Go back</Link></p>

      }
    </div>



  );
};
