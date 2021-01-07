import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'


function App() {
  return (
    <React.StrictMode>
      <NavBar />
        <ItemListContainer greeting={"Bienvenido a Cosmic"} />
    </React.StrictMode>
  );
}

export default App;
