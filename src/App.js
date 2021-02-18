import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { CartContainer } from './components/CartContainer/CartContainer'
import { Error } from './components/Error/Error'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { LoginContainer } from './components/LoginContainer/LoginContainer'
import { SignupContainer } from './components/SignupContainer/SignupContainer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CartContext } from './context/CartContext'
import { WishListContext } from './context/WishListContext'
import { UserContextExport } from './context/UserContext'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './firebase'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <CartContext><WishListContext>
          <UserContextExport>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
              <div id="full">
                <NavBar />
                <Switch>
                  <Route exact path="/item/:itemId">
                    <ItemDetailContainer />
                  </Route>
                  <Route exact path="/categories/:categoryKey">
                    <ItemListContainer greeting={"Bienvenido a Cosmic"} />
                  </Route>
                  <Route exact path="/cart">
                    <CartContainer />
                  </Route>
                  <Route exact path="/">
                    <ItemListContainer greeting={"Bienvenido a Cosmic"} />
                  </Route>
                  <Route exact path="/signup">
                    <SignupContainer />
                  </Route>
                  <Route exact path="/login">
                    <LoginContainer />
                  </Route>
                  <Route path="/" component={Error} />
                </Switch>
              </div>
            </FirebaseAppProvider>
          </UserContextExport>
        </WishListContext></CartContext>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
