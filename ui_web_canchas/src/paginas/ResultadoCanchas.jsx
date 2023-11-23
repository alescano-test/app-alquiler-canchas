import { useEffect, useState } from "react";
import { Cancha } from "../componentes/Cancha";
import axios from "axios";

export default function ResultadoCanchas() {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const buscarCanchas = async () => {
      const datosCanchas = await axios.get("http://localhost:3000/canchas");
      const datos = datosCanchas.data;
      setCanchas(datos);
    };
    buscarCanchas();
  }, []);

  return (
    <>
      <div className="hero min-h-screen flex flex-col flex-wrap p-8 py-6">
        <div className="grid grid-cols-2 gap-6">
          {canchas.map((cancha) => {
            return (
              <Cancha
                imagen={<iframe src="https://giphy.com/embed/oqWEEn8VBrlqp7HBqb" width="480" height="238" class="giphy-embed" allowFullScreen></iframe>}
                nombreClub={cancha.nombre}
                dimensiones={cancha.dimensiones}
                cant_jugadores = {cancha.cant_jugadores}
                precio={cancha.precio}
                suelo={cancha.suelo}
              />
            );
          })}

        </div>
        
      </div>
    </>
  );
}
