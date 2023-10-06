import React from "react";
import '../App.css';

export default function Onboarding({setPantalla}) {

    const irDiagnostico = () => {
        setPantalla('Diagnostico');
    }

    return(
    <div>
        <header className="App-header">
            <h1>Bienvenido a<br/>HydroBoard</h1>
        </header>

        <img src="https://res.cloudinary.com/dl5cchptf/image/upload/v1696429002/erieowqsbpb7edbajyoe.png" alt="Argentina" className='imagen'/>
        <br/>
        <button type="button" class="btn btn-light btn-lg" onClick={irDiagnostico}>Ingresar</button>
    </div>
  );
}