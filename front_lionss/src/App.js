import './App.css';
//import { useState } from 'react'; //importar usestate para el filtrado de busqueda
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LionSystemsLogo from './assets/imagenes/LionSystemsLogo.jpg'
//importando mis componentes
import ShowSalas from './components/ShowSalas';
import CreateSala from './components/CreateSala';
import EditSala from './components/EditSala';
import ShowJuntas from './components/ShowJuntas';
import CreateJunta from './components/CreateJunta';
import EditJunta from './components/EditJunta';

function App() {
  
  return (
    
    <div className="App"><br></br>
      <h1>Examen Lion Systems Solutions</h1>
      <h1>Created By Sirilo</h1>
      <img src={LionSystemsLogo} height="400" ></img>
      <br></br>
      <h2>Tabla de Salas</h2>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowSalas/> } />
          <Route path='/create' element={ <CreateSala/> }/>
          <Route path='/edit/:id' element={ <EditSala/> }/>
        </Routes>
      </BrowserRouter>
      <br></br>
      <h2>Tabla de Juntas</h2>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowJuntas/> } />
          <Route path='/create' element={ <CreateJunta/> }/>
          <Route path='/edit/:id' element={ <EditJunta/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}
export default App;