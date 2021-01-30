import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { Cart } from './components/Cart/Cart'
import { Error } from './components/Error/Error'
import { ItemListContainer } from './containers/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './containers/ItemDetailContainer/ItemDetailContainer'
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
              <Route exact path="/categories/:categoryId">
                <ItemListContainer greeting={"Bienvenido a Cosmic"} />
              </Route>
              <Route exact path="/cart">
                <Cart />
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
