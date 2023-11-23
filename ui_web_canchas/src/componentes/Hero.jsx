import { Link } from "react-router-dom"
import { Boton } from "./Boton"
import { useEffect, useState } from "react"
import axios from "axios";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const Hero = () => {
    const [deportes, setDeportes] = useState([])
    const [tipoDeporte, setTipoDeporte] = useState('');

    const [horas, setHoras] = useState([])
    const [obtenerHora, setObtenerHora] = useState('');

    const [fechas, setFechas] = useState(new Date())

    useEffect(() => {
        const buscarCanchas = async () => {
            const datosCanchas = await axios.get('http://localhost:3000/canchas');
            const datos = datosCanchas.data
            
            setDeportes(datos)
            console.log(datosCanchas)
            console.log(fechas)
        }
        buscarCanchas()
    }, [])


    return(
        <>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://img.freepik.com/foto-gratis/joven-corredor-atar-cordones_1421-46.jpg?size=626&ext=jpg&ga=GA1.1.237791928.1699762615&semt=sph)'}}>
            <div className="hero-overlay justify-center bg-opacity-60 grid grid-rows-2">
                <div className="hero-content max-h-32 text-center text-neutral-content self-center">
                    <div className="max-h-30 font-texts ">
                        <p className="font-base font-bold tracking-wide text-5xl text-black">Reservá tu cancha al instante!</p>
                        <p className="font-texts text-2xl text-black">Explorá las canchas disponibles en tu ciudad y en tiempo real.</p>
                    </div>
                </div>
                <div className="selectores flex row-start-2 grow space-x-10 flex-wrap">
                    <select className="form-select h-10 w-64 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base" 
                    onChange={(event) =>{
                        setTipoDeporte(event.target.value);
                    }}>
                    <option disabled selected>Deporte</option>
                        {deportes.map((deporte) => {
                            return(
                                <option key={deporte.id_cancha}>
                                    {deporte.tipo_deporte}
                                </option>
                            )
                        })}
                    </select>


                    <DatePicker 
                        showIcon
                        className="font-texts h-10 hover:border-slate-400 rounded-md border-2 border-verde-claro "
                        dateFormat="dd/MM/yyyy"
                        selected={fechas} 
                        onChange={fecha => setFechas(fecha)} 
                    />


                    <select className="form-select h-10 w-64 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base" 
                    onChange={(event) =>{
                        setObtenerHora(event.target.value);
                    }}>
                        <option disabled selected>Hora</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>

                    </select>
                    <Link to="/resultadoCanchas">
                        <Boton btnNombre="Buscar"/>
                    </Link>
                    
                </div>
            </div> 
        </div>
            









            
            
            
            
            
            
            
            
            
            
            {/*<div className="contenedor-hero" style={{backgrounImage: {bg_hero}}}>
                <div className="texto font-texts text-left">
                    <h1 className="font-base font-bold tracking-wide ">Reserva tu cancha al instante!</h1>
                    <h5>Explorá las canchas disponibles en tu ciudad y en tiempo real.</h5>
                </div>   
                

    </div>*/}
        </>
    )
}