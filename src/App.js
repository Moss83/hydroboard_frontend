import './App.css';
import React, {useState} from 'react';
import Onboarding from './components/Onboarding';
import Diagnostico from './components/Diagnostico';

function App() {

  const [pantalla, setPantalla] = useState('Onboarding');

  return (
    <div className="App">
      {
        pantalla === 'Onboarding' ? (<Onboarding setPantalla = {setPantalla}></Onboarding>) : 
        (<Diagnostico setPantalla = {setPantalla}></Diagnostico>)
      }
    </div>
  );
}

export default App;
