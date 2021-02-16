import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { CartContainer } from './components/CartContainer/CartContainer'
import { Error } from './components/Error/Error'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Context} from './context/cartContext'


function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Context>
          <div id="full">
            <NavBar />
            <Switch>
              <Route exact path="/item/:itemId">
                <ItemDetailContainer />
              </Route>
              {/* Decidí usar categoryKey en lugar de categoryId para mejorar la estética de la URL */}
              {/* Me pareció que quedaba mejor que diga /spaceships en lugar de /ASn39dhweidj9328*/}
              <Route exact path="/categories/:categoryKey">
                <ItemListContainer greeting={"Bienvenido a Cosmic"} />
              </Route>
              <Route exact path="/cart">
                <CartContainer />
              </Route>
              <Route exact path="/">
                <ItemListContainer greeting={"Bienvenido a Cosmic"} />
              </Route>
              <Route path="/" component={Error} />
            </Switch>
          </div>
        </Context>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
