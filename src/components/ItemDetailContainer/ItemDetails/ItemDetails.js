import React, { useState, useContext } from "react";
// import {useParams} from 'react-router-dom'
import "./ItemDetails.css";
import { ItemCount } from "./ItemCount/ItemCount";
import { CustomItem } from "./CustomItem/CustomItem";
import { Context } from "../../../context/CartContext";
import { WLContext } from "../../../context/WishListContext";
import { UserContext } from "../../../context/UserContext";

export const ItemDetails = ({ item, selectOption }) => {
  const [finishFlag, setFinishFlag] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const [stock, setStock] = useState(item.stock);
  const [finishMessage, setfinishMessage] = useState("");
  const { addItem } = useContext(Context);
  const { addItemToWishList } = useContext(WLContext);
  const { auth } = useContext(UserContext);

  const showFinish = () => {
    setFinishFlag(true);
  };

  function addHandler(quantityToAdd) {
    if (quantityToAdd) {
      if (item.options && !item.selectedOption) {
        alert("You need to chose a variant")
      } else setAddedQuantity(quantityToAdd);
    }
  }

  function finish() {
    addItem(item, addedQuantity);
    setStock(stock - addedQuantity)
    setFinishFlag(false);
    setfinishMessage("Added to Cart")
    setAddedQuantity(0)
  }

  function toWishList() {
    addItemToWishList(item, addedQuantity);
    setFinishFlag(false);
    setfinishMessage("Added to WishList")
    setAddedQuantity(0)
  }

  function undo() {
    setAddedQuantity(0);
    setFinishFlag(false);
    setfinishMessage("")
    delete item.selectedOption
  }

  function getInitial(stock) {
    let initial = 1;
    if (parseInt(stock) <= 0) initial = 0
    return initial;
  }

  function handleOptionSelected(option) {
    selectOption(option)
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
  );
};
