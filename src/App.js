import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'


function App() {
  return (
    <React.StrictMode>
      <div id="full">
      <NavBar />
        <ItemListContainer greeting={"Bienvenido a Cosmic"} />
        </div>
    </React.StrictMode>
  );
}

export default App;
