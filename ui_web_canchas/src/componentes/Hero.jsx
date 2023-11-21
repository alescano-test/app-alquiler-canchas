import { Link } from "react-router-dom"
import { Boton } from "./Boton"
import { Fecha } from "./Fecha"
import { useState } from "react"

export const Hero = () => {
    const [tipoDeporte, setTipoDeporte] = useState("")
    const [hora, setHora] = useState("")


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
                    <select className="form-select h-10 w-64 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base">
                        <option disabled selected>Deporte</option>
                        <option>Fútbol</option>
                        <option>Tenis</option>
                        <option>Padel</option>
                        <option>Voley</option>
                    </select>
                    <Fecha />
                    <select className="form-select h-10 w-60 hover:border-slate-400 rounded-md border-2 border-verde-claro font-base">
                        <option disabled selected>Hora</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>00:00</option>
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