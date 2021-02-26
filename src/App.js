import './App.css';
import { NavBarContainer } from './components/NavBarContainer/NavBarContainer'
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
import { OrderContainer } from './components/OrderContainer/OrderContainer'
import { CheckoutContainer } from './components/CartContainer/CheckoutContainer/CheckoutContainer';

const routeCodes = {
  Home: '/',
  ItemDetailContainer: '/item/:itemId',
  ItemListContainer: '/categories/:categoryKey',
  CartContainer: '/cart',
  SignupContainer: '/signup',
  LoginContainer: '/login',
  OrderContainer: '/orders',
  CheckoutContainer: '/checkout',
};

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <CartContext><WishListContext>
          <UserContextExport>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
              <div id="full">
                <NavBarContainer />
                <Switch>
                  <Route exact path={routeCodes.ItemDetailContainer}>
                    <ItemDetailContainer />
                  </Route>
                  <Route exact path={routeCodes.Home}>
                    <ItemListContainer />
                  </Route>
                  <Route exact path={routeCodes.CartContainer}>
                    <CartContainer />
                  </Route>
                  <Route exact path={routeCodes.ItemListContainer}>
                    <ItemListContainer />
                  </Route>
                  <Route exact path={routeCodes.OrderContainer}>
                    <OrderContainer />
                  </Route>
                  <Route exact path={routeCodes.SignupContainer}>
                    <SignupContainer />
                  </Route>
                  <Route exact path={routeCodes.LoginContainer}>
                    <LoginContainer />
                  </Route>
                  <Route exact path={routeCodes.CheckoutContainer}>
                    <CheckoutContainer />
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
