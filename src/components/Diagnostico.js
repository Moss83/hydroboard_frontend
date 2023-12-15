import React, {useState} from "react"
import GaugeChart from 'react-gauge-chart'
import '../App.css';
import '../styles/Diagnostico.css'


export default function Diagnostico({setPantalla}) {

    const [humedad, setHumedad] = useState("");
    const [temperatura, setTemperatura] = useState("");
    const [viento, setViento] = useState("");
    const [precipitaciones, setPrecipitaciones] = useState("");
    const [ffmc, setFfmc] = useState("");
    const [dmc, setDmc] = useState("");
    const [dc, setDc] = useState("");
    const [porcentaje, setPorcentaje] = useState(-1);
    const [animar, setAnimar] = useState(true);

    const irOnboarding = () => {
        setPantalla("Onboarding");
    }

    const setearHumedad = (valor) => {
        setAnimar(false);
        setHumedad(valor);
    }

    const setearTemperatura = (valor) => {
        setAnimar(false);
        setTemperatura(valor);
    }

    const setearViento = (valor) => {
        setAnimar(false);
        setViento(valor);
    }

    const setearPrecipitaciones = (valor) => {
        setAnimar(false);
        setPrecipitaciones(valor);
    }

    const setearFfmc = (valor) => {
        setAnimar(false);
        setFfmc(valor);
    }

    const setearDmc = (valor) => {
        setAnimar(false);
        setDmc(valor);
    }

    const setearDc = (valor) => {
        setAnimar(false);
        setDc(valor);
    }

    const predecir = () => {

        setAnimar(true);

        fetch("http://localhost:5000/kmeans/" + humedad + "/" + precipitaciones + "/" + temperatura + "/" + viento + 
                "/" + ffmc + "/" + dmc + "/" + dc, 
        {
            method: "GET",
            mode: "cors",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .catch((error) => console.error("Error: " + error))
        .then((response) => {
            let grupo = parseInt(response.prediccion);
            setPorcentaje(grupo / 10)
        });
    }

    const chartStyle = {
        width: '50%'
    }

    return (
        <div>
            <header className="App-header">
                <h1>Diagnóstico</h1>
                <h3>Para Parque Nacional El Palmar</h3>
            </header>

            <h3 className="normal">Normal</h3>

            <div className="container">
                <div className="chart-container">
                    <h3 className="humedo">Húmedo</h3>
                    <GaugeChart id="gauge-chart1" style={chartStyle} hideText={true} percent={porcentaje} animate={animar}/>
                    <h3 className="seco">Seco</h3>
                </div>
            </div>

            <h2 className="probabilidad-sequia">Probabilidad de sequía</h2>
            <h2 className="porcentaje">{porcentaje === -1 ? "-" : parseInt(porcentaje * 100)}{"%"}</h2>
            <h3 className="subtitulo">Efectuar suposición</h3>
            <div className="labels">
                <h5 className="texto-humedad">Humedad {"(%)"}</h5>
                <h5 className="texto-temperatura">Temperatura {"(°C)"}</h5>
                <h5 className="texto-viento">Viento {"(km/h)"}</h5>
                <h5 className="texto-precipitaciones">Precipitaciones {"(mm.)"}</h5>
                <h5 className="texto-ffmc">FFMC</h5>
                <h5 className="texto-dmc">DMC</h5>
                <h5 className="texto-dc">DC</h5>
            </div>
            <div className="inputs">
                <input type="text" style={{width: 100}} placeholder="Humedad (%)" className="texto-diagnostico" name="humedad" value={humedad} onChange={p => setearHumedad(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="Temperatura (°C)" className="texto-diagnostico" name="temperatura" value={temperatura} onChange={p => setearTemperatura(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="Viento (km/h)" className="texto-diagnostico" name="viento" value={viento} onChange={p => setearViento(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="Precipitaciones (mm.)" className="texto-diagnostico" name="precipitaciones" value={precipitaciones} onChange={p => setearPrecipitaciones(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="FFMC" className="texto-diagnostico" name="FFMC" value={ffmc} onChange={p => setearFfmc(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="DMC" className="texto-diagnostico" name="DMC" value={dmc} onChange={p => setearDmc(p.target.value)}></input>
                <input type="text" style={{width: 100}} placeholder="DC" className="texto-diagnostico" name="DC" value={dc} onChange={p => setearDc(p.target.value)}></input>
            </div>
            <div className="botones">
                <button type="button" class="btn btn-light btn-lg" onClick={irOnboarding}>{"<"} Atrás</button>
                <button type="button" class="btn btn-light btn-lg" onClick={predecir}>Predecir {">"}</button>
            </div>
        </div>
    );
}