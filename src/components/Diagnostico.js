import React, {useState} from "react"
import GaugeChart from 'react-gauge-chart'
import '../App.css';
import '../styles/Diagnostico.css'


export default function Diagnostico({setPantalla}) {

    const [humedad, setHumedad] = useState("");
    const [precipitaciones, setPrecipitaciones] = useState("");
    const [prediccion, setPrediccion] = useState("");
    const [porcentaje, setPorcentaje] = useState(0);
    const [animar, setAnimar] = useState(true);

    const irOnboarding = () => {
        setPantalla("Onboarding");
    }

    const setearHumedad = (valor) => {
        setAnimar(false);
        setHumedad(valor);
    }

    const setearPrecipitaciones = (valor) => {
        setAnimar(false);
        setPrecipitaciones(valor);
    }

    const predecir = () => {

        setAnimar(true);

        fetch("http://localhost:5000/kmeans/" + humedad + "/" + precipitaciones, {
            method: "GET",
            mode: "cors",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .catch((error) => console.error("Error: " + error))
        .then((response) => {
            let grupo = parseInt(response.prediccion);
            if (grupo == 2){
                setPorcentaje(0.83);
                setPrediccion("Seco");
            }
            else if (grupo <= 1) {
                setPorcentaje(0.5);
                setPrediccion("Normal");
            }
            else {
                setPorcentaje(0.165);
                setPrediccion("Húmedo");
            }
        });
    }

    const chartStyle = {
        width: '50%',
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

            <h3 className="subtitulo">Efectuar suposición</h3>
            <div className="inputs">
                <input type="text" placeholder="Humedad (%)" className="texto-diagnostico" name="humedad" value={humedad} onChange={p => setearHumedad(p.target.value)}></input>
                <input type="text" placeholder="Precipitaciones (mm.)" className="texto-diagnostico" name="precipitaciones" value={precipitaciones} onChange={p => setearPrecipitaciones(p.target.value)}></input>
            </div>
            <div className="botones">
                <button type="button" class="btn btn-light btn-lg" onClick={irOnboarding}>{"<"} Atrás</button>
                <button type="button" class="btn btn-light btn-lg" onClick={predecir}>Predecir {">"}</button>
            </div>
        </div>
    )
}