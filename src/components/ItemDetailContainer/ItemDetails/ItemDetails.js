import React, { useState, useContext } from "react";
// import {useParams} from 'react-router-dom'
import "./ItemDetails.css";
import { ItemCount } from "./ItemCount/ItemCount";
import { useHistory } from "react-router-dom";
import { Context } from "../../../context/CartContext";
import { WLContext } from "../../../context/WishListContext";
import { UserContext } from "../../../context/UserContext";

export const ItemDetails = ({ item }) => {
  const [finishFlag, setFinishFlag] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const { addItem } = useContext(Context);
  const { addItemToWishList } = useContext(WLContext);
  const history = useHistory();
  const { auth } = useContext(UserContext);

  const showFinish = () => {
    setFinishFlag(true);
  };

  function addHandler(quantityToAdd) {
    if (quantityToAdd) {
      setAddedQuantity(quantityToAdd);
    }
  }

  function finish() {
    console.log("finish");
    console.log(item, addedQuantity);
    addItem(item, addedQuantity);
    history.push("/cart");
  }

  function toWishList() {
    console.log("finish");
    console.log(item, addedQuantity);
    addItemToWishList(item, addedQuantity);
    history.push("/cart");
  }

  function undo() {
    setAddedQuantity(0);
    setFinishFlag(false);
  }

  function getInitial(stock) {
    let initial = 1;
    if (parseInt(stock) <= 0) initial = 0
    return initial;
  }

  return (
    <React.Fragment>
      <div class="item-container">
        <div class="inside-item">
          <h1> {item.title} </h1> <h2> {item.description} </h2>{" "}
          <h3 class="price"> {item.price} </h3>{" "}
          <img id="product-image" src={item.pictureUrl} alt="pic" />
          <div>
            {auth && !addedQuantity && <div>
              <ItemCount
                stock={item.stock}
                initial={getInitial(item.stock)}
                onAdd={addHandler}
                onFinish={showFinish}
              /> {parseInt(item.stock) <= 0 && <p>Sorry, there is no more stock</p>}
            </div>}
            {finishFlag && (
              <div>
                Seleccionaste {addedQuantity}
                items <br />
                <button onClick={undo}> Deshacer </button>
                <button onClick={finish}> Agregar al carrito </button>
                <button onClick={toWishList}> Agregar a la WishList </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
